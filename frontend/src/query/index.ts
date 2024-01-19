import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { SchoolResponse, SchoolsResponse } from "../types";

// A query hook to 'List' all the school
export const useSchools = () => {
  return useQuery<SchoolsResponse>({
    queryKey: ["schools"],
    queryFn: () =>
      axios.get("http://localhost:8000/api/school").then((res) => res.data),
  });
};

// A query hook to 'Read' a single school
export const useSchool = ({ id }: { id: string | null }) => {
  return useQuery<SchoolResponse>({
    queryKey: ["schools", id],
    enabled: id !== null,
    queryFn: () => {
      return axios
        .get(`http://localhost:8000/api/school/${id}`)
        .then((res) => res.data);
    },
  });
};
