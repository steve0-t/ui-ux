use super::*;
use axum::{
    body::{Body, to_bytes},
    http::Request,
};
use serde_json::{Value, json};
use tower::ServiceExt;

async fn request(app: &Router, method: &str, path: &str, body: Value) -> (StatusCode, Value) {
    let request = Request::builder()
        .method(method)
        .uri(path)
        .header("content-type", "application/json")
        .body(Body::from(body.to_string()))
        .unwrap();
    let response = app.clone().oneshot(request).await.unwrap();
    let status = response.status();
    let bytes = to_bytes(response.into_body(), 1_000_000).await.unwrap();
    (status, serde_json::from_slice(&bytes).unwrap())
}
async fn get(app: &Router) -> Value {
    request(app, "GET", "/api/plan", Value::Null).await.1
}
async fn command(app: &Router, path: &str, mut body: Value) -> Value {
    body["revision"] = get(app).await["revision"].clone();
    let (status, result) = request(app, "POST", path, body).await;
    assert_eq!(status, StatusCode::OK, "{result}");
    result
}
async fn patient(app: &Router, body: Value) -> Value {
    command(app, "/api/actions", body).await
}
async fn demo(app: &Router, body: Value) -> Value {
    command(app, "/api/demo", body).await
}
fn step<'a>(plan: &'a Value, id: &str) -> &'a Value {
    plan["steps"]
        .as_array()
        .unwrap()
        .iter()
        .find(|s| s["id"] == id)
        .unwrap()
}

#[tokio::test]
async fn completion_correction_and_elapsed_time_are_distinct() {
    let app = app();
    let result = patient(
        &app,
        json!({"type":"completion","step_id":"instructions","completed":true}),
    )
    .await;
    assert_eq!(result["completed_count"], 1);
    assert_eq!(result["next_step_id"], "medicines");
    demo(&app, json!({"type":"advance_time"})).await;
    let result = patient(
        &app,
        json!({"type":"completion","step_id":"instructions","completed":false}),
    )
    .await;
    assert_eq!(step(&result, "instructions")["status"], "unconfirmed");
    assert_eq!(result["history"].as_array().unwrap().len(), 2);
    assert!(result["problems"].as_array().unwrap().is_empty());
    assert_eq!(result["applicable_count"], 5);
}

#[tokio::test]
async fn complete_records_never_resolve_an_open_problem() {
    let app = app();
    let now = get(&app).await["now"].clone();
    patient(&app, json!({"type":"report_problem","step_id":"transport","description":"Nemám zabezpečený odvoz.","occurred_at":now})).await;
    for id in [
        "instructions",
        "medicines",
        "transport",
        "documents",
        "arrival",
    ] {
        patient(
            &app,
            json!({"type":"completion","step_id":id,"completed":true}),
        )
        .await;
    }
    let result = get(&app).await;
    assert_eq!(result["completed_count"], result["applicable_count"]);
    assert_eq!(result["problems"][0]["status"], "saved_demo");
    assert_eq!(step(&result, "transport")["status"], "problem");
}

#[tokio::test]
async fn request_and_acknowledgement_do_not_confirm_clinical_plan() {
    let app = app();
    let original = get(&app).await;
    let result = patient(
        &app,
        json!({"type":"request_change","reason":"V tomto čase nemôžem prísť."}),
    )
    .await;
    assert_eq!(original["appointment"], result["appointment"]);
    demo(&app, json!({"type":"confirm_appointment"})).await;
    let result = patient(&app, json!({"type":"acknowledge_change"})).await;
    assert_eq!(result["validity"], "awaiting_confirmation");
    assert_eq!(result["change"]["previous"], original["appointment"]);
    let result = demo(&app, json!({"type":"confirm_plan"})).await;
    assert_eq!(result["validity"], "current");
    assert_eq!(result["plan_version"], 2);
    assert_eq!(result["instructions"].as_array().unwrap().len(), 2);
}

#[tokio::test]
async fn change_during_preparation_preserves_history_and_original_times() {
    let app = app();
    patient(
        &app,
        json!({"type":"completion","step_id":"medicines","completed":true}),
    )
    .await;
    patient(&app, json!({"type":"start_preparation"})).await;
    let original = get(&app).await;
    let result = demo(&app, json!({"type":"confirm_appointment"})).await;
    assert_eq!(original["history"], result["history"]);
    assert_eq!(
        step(&original, "medicines")["due_at"],
        step(&result, "medicines")["due_at"]
    );
    assert_eq!(step(&result, "medicines")["status"], "verify");
    assert!(!step(&result, "medicines")["completed_at"].is_null());
    let (status, _) = request(
        &app,
        "POST",
        "/api/demo",
        json!({"revision":result["revision"],"type":"confirm_plan"}),
    )
    .await;
    assert_eq!(status, StatusCode::UNPROCESSABLE_ENTITY);
    assert_eq!(get(&app).await, result);
    let corrected = patient(
        &app,
        json!({"type":"completion","step_id":"medicines","completed":false}),
    )
    .await;
    assert_eq!(step(&corrected, "medicines")["status"], "verify");
}

#[tokio::test]
async fn obsolete_reminders_cannot_return_after_reload_or_preference_change() {
    let app = app();
    let settings = json!({"type":"reminders","enabled":true,"channel":"sms","minutes_before":60});
    let result = patient(&app, settings.clone()).await;
    assert!(
        result["reminders"]
            .as_array()
            .unwrap()
            .iter()
            .any(|r| r["active"] == true)
    );
    demo(&app, json!({"type":"confirm_appointment"})).await;
    patient(&app, settings).await;
    let result = get(&app).await;
    assert!(
        result["reminders"]
            .as_array()
            .unwrap()
            .iter()
            .all(|r| r["active"] == false)
    );
    let result = demo(&app, json!({"type":"confirm_plan"})).await;
    for reminder in result["reminders"].as_array().unwrap() {
        if reminder["active"] == true {
            assert_eq!(reminder["plan_version"], 2);
        }
        if reminder["plan_version"] == 1 {
            assert_eq!(reminder["active"], false);
        }
    }
}

#[tokio::test]
async fn invalid_commands_and_stale_retries_are_atomic() {
    let app = app();
    let original = get(&app).await;
    for action in [
        json!({"type":"report_problem","step_id":"unknown","description":"Niečo sa stalo.","occurred_at":original["now"]}),
        json!({"type":"report_problem","step_id":"transport","description":" ","occurred_at":original["now"]}),
        json!({"type":"report_problem","step_id":"transport","description":"Niečo sa stalo.","occurred_at":"2030-01-01T00:00:00Z"}),
        json!({"type":"completion","step_id":"print","completed":true}),
        json!({"type":"reminders","enabled":true,"channel":"sms","minutes_before":17}),
    ] {
        let mut action = action;
        action["revision"] = original["revision"].clone();
        let (status, _) = request(&app, "POST", "/api/actions", action).await;
        assert_eq!(status, StatusCode::UNPROCESSABLE_ENTITY);
        assert_eq!(get(&app).await, original);
    }
    let action = json!({"revision":original["revision"],"type":"completion","step_id":"instructions","completed":true});
    assert_eq!(
        request(&app, "POST", "/api/actions", action.clone())
            .await
            .0,
        StatusCode::OK
    );
    assert_eq!(
        request(&app, "POST", "/api/actions", action).await.0,
        StatusCode::CONFLICT
    );
    assert_eq!(get(&app).await["history"].as_array().unwrap().len(), 1);
}

#[tokio::test]
async fn reset_keeps_revision_monotonic_and_bad_json_is_explained() {
    let app = app();
    let original = get(&app).await;
    for scenario in [
        "normal",
        "missing",
        "problem",
        "change_before",
        "change_during",
    ] {
        let result = demo(&app, json!({"type":"reset","scenario":scenario})).await;
        assert!(result["revision"].as_u64().unwrap() > original["revision"].as_u64().unwrap());
    }
    let (status, body) = request(&app, "POST", "/api/actions", json!({"type":"unknown"})).await;
    assert_eq!(status, StatusCode::BAD_REQUEST);
    assert!(body["message"].is_string());
}
