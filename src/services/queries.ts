import { useQueries, useQuery } from "@tanstack/react-query";
import { getTodo, getTodosIds } from "./api";

export function useTodosIds() {
  return useQuery({
    queryKey: ["todos"],
    queryFn: getTodosIds,
  });
}

export const useTodos = (ids?: number[]) => {
  return useQueries({
    queries:
      ids?.map((id) => ({
        queryKey: ["todos", { id }],
        queryFn: () => getTodo(id),
        enabled: !!id, // id가 존재할 때만 실행
      })) || [],
  });
};
