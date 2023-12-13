import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { School } from "../types";

// A mutation hook to 'Create' a single school
export const useCreateSchool = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newSchool: School) => {
      return axios.post(`http://localhost:8000/api/school`, newSchool);
    },

    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ["schools"] });
    },
  });
};

// A mutation hook to 'Delete' a single school
export const useDeleteSchool = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => {
      return axios.delete(`http://localhost:8000/api/school/${id}`);
    },

    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ["schools"] });
    },
  });
};

// A mutation hook to 'Update' a single school
export const useUpdateSchool = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: School) => {
      return axios.patch(`http://localhost:8000/api/school/${data.id}`, {
        name: data.name,
      });
    },

    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ["schools"] });
    },
  });
};
