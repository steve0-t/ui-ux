use axum::{Json, Router, routing::get};
use serde::Serialize;

#[derive(Serialize)]
struct Health {
    status: &'static str,
    service: &'static str,
}

async fn health() -> Json<Health> {
    Json(Health {
        status: "ok",
        service: "patient-preparation-api",
    })
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let app = Router::new().route("/api/health", get(health));
    let listener = tokio::net::TcpListener::bind("127.0.0.1:3000").await?;
    println!("API listening at http://127.0.0.1:3000");
    axum::serve(listener, app)
        .with_graceful_shutdown(async {
            let _ = tokio::signal::ctrl_c().await;
        })
        .await?;
    Ok(())
}
