import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { SchoolResponse, SchoolsResponse } from "../types";

export const useSchools = () => {
  return useQuery<SchoolsResponse>({
    queryKey: ["schools"],
    queryFn: () =>
      axios.get("http://localhost:8000/api/school").then((res) => res.data),
  });
};

export const useSchool = ({ id }: { id: string | undefined }) => {
  return useQuery<SchoolResponse>({
    queryKey: ["schools"],
    queryFn: () => {
      return axios
        .get(`http://localhost:8000/api/school/${id}`)
        .then((res) => res.data);
    },
  });
};
