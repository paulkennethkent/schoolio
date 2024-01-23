import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { School } from "../types";
import { useOptimismStore } from "../store";

// A mutation hook to 'Create' a single school
export const useCreateSchool = () => {
  const queryClient = useQueryClient();
  const { optimism } = useOptimismStore();
  return useMutation({
    mutationFn: (newSchool: School) => {
      return axios.post(`http://localhost:8000/api/school`, newSchool);
    },
    onMutate: async (newSchool: School) => {
      const isOptimistic = Boolean(optimism);

      if (isOptimistic) {
        await queryClient.cancelQueries({ queryKey: ["schools"] });
        const previous = queryClient.getQueryData<Array<School>>(["schools"]);

        queryClient.setQueryData(["schools"], (old: Array<School>) => {
          const schools = [
            ...(old as unknown as { schools: Array<School> }).schools,
            { ...newSchool, id: `OPTIMISTIC_ID_${Math.random()}` },
          ];
          return {
            ...old,
            schools: schools,
          };
        });

        return { previous, wasOptimistic: true };
      } else {
        return { previous: null, wasOptimistic: false };
      }
    },
    onError: async (_, __, context) => {
      if (context?.wasOptimistic) {
        queryClient.setQueryData(["schools"], context?.previous);
      }
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

  //  more lifecycles
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

    //  more lifecycles
  });
};
