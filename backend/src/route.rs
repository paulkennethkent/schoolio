use axum::{
    routing::{get, post},
    Router,
};

use crate::{
    handler::{
        create_school_handler, delete_school_handler, edit_school_handler, get_school_handler,
        school_list_handler,
    },
    model,
};
use serde::{Deserialize, Serialize};

pub fn create_router() -> Router {
    let db = model::school_db();

    Router::new()
        .route(
            "/api/school",
            post(create_school_handler).get(school_list_handler),
        )
        .route(
            "/api/school/:id",
            get(get_school_handler)
                .patch(edit_school_handler)
                .delete(delete_school_handler),
        )
        .with_state(db)
}

#[cfg(test)]
mod tests {

    use crate::response::{SchoolListResponse, SingleSchoolResponse};

    use super::*;
    use axum::http::StatusCode;
    use axum_test_helper::TestClient;

    #[derive(Debug, Serialize, Deserialize, PartialEq)]
    struct TestPayload {
        name: String,
    }

    /// A helper for creating schools for testing purposes
    async fn create_school_helper(
        client: &TestClient,
        payload: &TestPayload,
    ) -> axum_test_helper::TestResponse {
        let res = client
            .post("/api/school")
            .header("Content-Type", "application/json")
            .json(&payload)
            .send()
            .await;
        return res;
    }

    #[tokio::test]
    async fn test_create_school() {
        let router = create_router();
        let client: TestClient = TestClient::new(router);
        let payload = TestPayload {
            name: "New School".to_owned(),
        };
        let res = create_school_helper(&client, &payload).await;
        assert_eq!(res.status(), StatusCode::CREATED);
        let response_body: SingleSchoolResponse = serde_json::from_str(&res.text().await).unwrap();
        assert_eq!(response_body.data.school.name, payload.name);
    }

    #[tokio::test]
    async fn test_update_school() {
        let router = create_router();
        let client = TestClient::new(router);

        let payload = TestPayload {
            name: "New School".to_owned(),
        };
        let res = create_school_helper(&client, &payload).await;
        assert_eq!(res.status(), StatusCode::CREATED);
        let response_body: SingleSchoolResponse = serde_json::from_str(&res.text().await).unwrap();
        assert_eq!(response_body.data.school.name, payload.name);

        let update_payload = TestPayload {
            name: "Updated School".to_owned(),
        };

        let res_update: axum_test_helper::TestResponse = client
            .patch(format!("/api/school/{}", response_body.data.school.id.unwrap()).as_str())
            .header("Content-Type", "application/json")
            .json(&update_payload)
            .send()
            .await;
        assert_eq!(res_update.status(), StatusCode::OK);
        let response_body: SingleSchoolResponse =
            serde_json::from_str(&res_update.text().await).unwrap();
        assert_eq!(response_body.data.school.name, update_payload.name);
    }

    #[tokio::test]
    async fn test_delete_school() {
        let router = create_router();
        let client = TestClient::new(router);
        let payload = TestPayload {
            name: "New School".to_owned(),
        };
        let res = create_school_helper(&client, &payload).await;
        assert_eq!(res.status(), StatusCode::CREATED);
        let response_body: SingleSchoolResponse = serde_json::from_str(&res.text().await).unwrap();
        assert_eq!(response_body.data.school.name, payload.name);

        let res_delete: axum_test_helper::TestResponse = client
            .delete(format!("/api/school/{}", response_body.data.school.id.unwrap()).as_str())
            .send()
            .await;
        assert_eq!(res_delete.status(), StatusCode::NO_CONTENT);
    }

    #[tokio::test]
    async fn test_get_school() {
        let router = create_router();
        let client = TestClient::new(router);
        let payload = TestPayload {
            name: "New School".to_owned(),
        };
        let res = create_school_helper(&client, &payload).await;
        assert_eq!(res.status(), StatusCode::CREATED);
        let response_body: SingleSchoolResponse = serde_json::from_str(&res.text().await).unwrap();
        assert_eq!(response_body.data.school.name, payload.name);

        let res_get: axum_test_helper::TestResponse = client
            .get(format!("/api/school/{}", response_body.data.school.id.unwrap()).as_str())
            .header("Content-Type", "application/json")
            .send()
            .await;
        assert_eq!(res_get.status(), StatusCode::OK);
        let response_body: SingleSchoolResponse =
            serde_json::from_str(&res_get.text().await).unwrap();
        assert_eq!(response_body.data.school.name, payload.name);
    }

    #[tokio::test]
    async fn test_list_school() {
        let router = create_router();
        let client = TestClient::new(router);
        let payload = TestPayload {
            name: "New School".to_owned(),
        };
        let res = create_school_helper(&client, &payload).await;
        assert_eq!(res.status(), StatusCode::CREATED);
        let response_body: SingleSchoolResponse = serde_json::from_str(&res.text().await).unwrap();
        assert_eq!(response_body.data.school.name, payload.name);

        let res_list: axum_test_helper::TestResponse = client
            .get("/api/school")
            .header("Content-Type", "application/json")
            .send()
            .await;
        assert_eq!(res_list.status(), StatusCode::OK);
        let response_body: SchoolListResponse =
            serde_json::from_str(&res_list.text().await).unwrap();

        assert_eq!(response_body.results, 1);
    }
}
