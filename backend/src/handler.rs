use axum::{
    extract::{Path, State},
    http::StatusCode,
    response::IntoResponse,
    Json,
};
use uuid::Uuid;

use crate::{
    model::{School, UpdateSchoolSchema, DB},
    response::{SchoolData, SchoolListResponse, SingleSchoolResponse},
};

pub async fn school_list_handler(State(db): State<DB>) -> impl IntoResponse {
    let schools = db.lock().await;

    let schools: Vec<School> = schools.clone().into_iter().collect();

    let json_response = SchoolListResponse {
        status: "success".to_string(),
        results: schools.len(),
        schools,
    };

    Json(json_response)
}

pub async fn create_school_handler(
    State(db): State<DB>,
    Json(mut body): Json<School>,
) -> Result<impl IntoResponse, (StatusCode, Json<serde_json::Value>)> {
    let mut vec = db.lock().await;

    let uuid_id = Uuid::new_v4();

    body.id = Some(uuid_id.to_string());

    let school = body.to_owned();

    vec.push(body);

    let json_response = SingleSchoolResponse {
        status: "success".to_string(),
        data: SchoolData { school },
    };

    Ok((StatusCode::CREATED, Json(json_response)))
}

pub async fn get_school_handler(
    Path(id): Path<Uuid>,
    State(db): State<DB>,
) -> Result<impl IntoResponse, (StatusCode, Json<serde_json::Value>)> {
    let id = id.to_string();
    let vec = db.lock().await;

    if let Some(school) = vec.iter().find(|school| school.id == Some(id.to_owned())) {
        let json_response = SingleSchoolResponse {
            status: "success".to_string(),
            data: SchoolData {
                school: school.clone(),
            },
        };
        return Ok((StatusCode::OK, Json(json_response)));
    }

    let error_response = serde_json::json!({
        "status": "fail",
        "message": format!("School with ID: {} not found", id)
    });
    Err((StatusCode::NOT_FOUND, Json(error_response)))
}

pub async fn edit_school_handler(
    Path(id): Path<Uuid>,
    State(db): State<DB>,
    Json(body): Json<UpdateSchoolSchema>,
) -> Result<impl IntoResponse, (StatusCode, Json<serde_json::Value>)> {
    let id = id.to_string();
    let mut vec = db.lock().await;

    if let Some(school) = vec.iter_mut().find(|school| school.id == Some(id.clone())) {
        let name = body
            .name
            .to_owned()
            .unwrap_or_else(|| school.name.to_owned());
        let payload = School {
            id: school.id.to_owned(),
            name: if !name.is_empty() {
                name
            } else {
                school.name.to_owned()
            },
        };
        *school = payload;

        let json_response = SingleSchoolResponse {
            status: "success".to_string(),
            data: SchoolData {
                school: school.clone(),
            },
        };
        Ok((StatusCode::OK, Json(json_response)))
    } else {
        let error_response = serde_json::json!({
            "status": "fail",
            "message": format!("School with ID: {} not found", id)
        });

        Err((StatusCode::NOT_FOUND, Json(error_response)))
    }
}

pub async fn delete_school_handler(
    Path(id): Path<Uuid>,
    State(db): State<DB>,
) -> Result<impl IntoResponse, (StatusCode, Json<serde_json::Value>)> {
    let id = id.to_string();
    let mut vec = db.lock().await;

    if let Some(pos) = vec.iter().position(|school| school.id == Some(id.clone())) {
        vec.remove(pos);
        return Ok((StatusCode::NO_CONTENT, Json("")));
    }

    let error_response = serde_json::json!({
        "status": "fail",
        "message": format!("School with ID: {} not found", id)
    });

    Err((StatusCode::NOT_FOUND, Json(error_response)))
}
