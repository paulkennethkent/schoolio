use serde::{Deserialize, Serialize};
use std::sync::Arc;
use tokio::sync::Mutex;

#[derive(Debug, Deserialize, Serialize, Clone)]
pub struct School {
    pub id: Option<String>,
    pub name: String,
}

pub type DB = Arc<Mutex<Vec<School>>>;

pub fn school_db() -> DB {
    Arc::new(Mutex::new(Vec::new()))
}

#[allow(non_snake_case)]
#[derive(Debug, Deserialize, Serialize, Clone)]
pub struct UpdateSchoolSchema {
    pub name: Option<String>,
}
