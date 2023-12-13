use crate::model::School;
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize, PartialEq)]
pub struct GenericResponse {
    pub status: String,
    pub message: String,
}

#[derive(Debug, Serialize, Deserialize, PartialEq)]
pub struct SchoolData {
    pub school: School,
}

#[derive(Debug, Serialize, Deserialize, PartialEq)]
pub struct SingleSchoolResponse {
    pub status: String,
    pub data: SchoolData,
}

#[derive(Debug, Serialize, Deserialize, PartialEq)]
pub struct SchoolListResponse {
    pub status: String,
    pub results: usize,
    pub schools: Vec<School>,
}
