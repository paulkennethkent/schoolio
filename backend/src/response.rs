use crate::model::School;
use serde::Serialize;

#[derive(Serialize)]
pub struct GenericResponse {
    pub status: String,
    pub message: String,
}

#[derive(Serialize, Debug)]
pub struct SchoolData {
    pub school: School,
}

#[derive(Serialize, Debug)]
pub struct SingleSchoolResponse {
    pub status: String,
    pub data: SchoolData,
}

#[derive(Serialize, Debug)]
pub struct SchoolListResponse {
    pub status: String,
    pub results: usize,
    pub schools: Vec<School>,
}
