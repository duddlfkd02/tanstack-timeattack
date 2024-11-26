import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Todo } from "../types/todo";
import { createTodo, updateTodo } from "./api";

export function useCreateTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Todo) => createTodo(data),
    onMutate: () => {
      console.log("mutate");
    },
    onError: () => {
      console.log("error");
    },
    onSuccess: () => {
      console.log("success");
    },
    onSettled: async (_, error) => {
      console.log("settled");
      if (error) {
        console.log(error);
      } else {
        queryClient.invalidateQueries({ queryKey: ["todos"] });
      }
    },
  });
}

export default function useUpdateTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Todo) => updateTodo(data),

    onSettled: async (_, error, valiables) => {
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["todo"] });
        await queryClient.invalidateQueries({
          queryKey: ["todo", { id: valiables.id }],
        });
      }
    },
  });
}
