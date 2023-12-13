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
