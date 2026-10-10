mod domain;

use axum::{
    Json, Router,
    extract::{State, rejection::JsonRejection},
    http::StatusCode,
    routing::{get, post},
};
use domain::{DemoAction, Mutation, PatientAction, Plan};
use serde::Serialize;
use std::sync::{Arc, Mutex};

type Shared = Arc<Mutex<Plan>>;
#[derive(Serialize)]
struct ApiError {
    message: String,
}
type ApiResult = Result<Json<Plan>, (StatusCode, Json<ApiError>)>;

fn error(status: StatusCode, message: impl Into<String>) -> (StatusCode, Json<ApiError>) {
    (
        status,
        Json(ApiError {
            message: message.into(),
        }),
    )
}

fn mutate<T>(
    state: Shared,
    input: Result<Json<Mutation<T>>, JsonRejection>,
    apply: impl FnOnce(&mut Plan, T) -> domain::DomainResult,
) -> ApiResult {
    let Json(input) = input.map_err(|_| {
        error(
            StatusCode::BAD_REQUEST,
            "Údaje nemajú očakávaný formát. Skontrolujte vyplnené polia.",
        )
    })?;
    let mut plan = state.lock().map_err(|_| {
        error(
            StatusCode::INTERNAL_SERVER_ERROR,
            "Plán je dočasne nedostupný.",
        )
    })?;
    if input.revision != plan.revision {
        return Err(error(
            StatusCode::CONFLICT,
            "Plán sa medzičasom zmenil. Načítajte aktuálny plán a skontrolujte záznam pred ďalším pokusom.",
        ));
    }
    // Apply to a copy so every rejected command leaves authoritative state untouched.
    let mut updated = plan.clone();
    apply(&mut updated, input.action)
        .map_err(|message| error(StatusCode::UNPROCESSABLE_ENTITY, message))?;
    updated.revision += 1;
    updated.refresh();
    *plan = updated;
    Ok(Json(plan.clone()))
}

async fn read(State(state): State<Shared>) -> ApiResult {
    state.lock().map(|plan| Json(plan.clone())).map_err(|_| {
        error(
            StatusCode::INTERNAL_SERVER_ERROR,
            "Plán je dočasne nedostupný.",
        )
    })
}
async fn patient(
    State(state): State<Shared>,
    input: Result<Json<Mutation<PatientAction>>, JsonRejection>,
) -> ApiResult {
    mutate(state, input, Plan::patient)
}
async fn demo(
    State(state): State<Shared>,
    input: Result<Json<Mutation<DemoAction>>, JsonRejection>,
) -> ApiResult {
    mutate(state, input, Plan::demo)
}
fn app() -> Router {
    Router::new()
        .route("/api/health", get(|| async { Json(serde_health()) }))
        .route("/api/plan", get(read))
        .route("/api/actions", post(patient))
        .route("/api/demo", post(demo))
        .with_state(Arc::new(Mutex::new(Plan::new(1))))
}
fn serde_health() -> std::collections::BTreeMap<&'static str, &'static str> {
    [("status", "ok"), ("service", "patient-preparation-api")].into()
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let listener = tokio::net::TcpListener::bind("127.0.0.1:3000").await?;
    println!("Fictional demo API listening at http://127.0.0.1:3000 (memory resets on restart)");
    axum::serve(listener, app())
        .with_graceful_shutdown(async {
            let _ = tokio::signal::ctrl_c().await;
        })
        .await?;
    Ok(())
}

#[cfg(test)]
mod tests;
