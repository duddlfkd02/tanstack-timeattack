import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Todo } from "../types/todo";
import { createTodo } from "./api";

export function useCreateTodo() {
  const queryClient = useQueryClient();
  // powerful API that you can anything with your query client "cache, mutation else..."
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
