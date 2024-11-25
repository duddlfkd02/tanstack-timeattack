import { useIsFetching } from "@tanstack/react-query";
import { useTodosIds } from "../services/queries";

export default function Todo() {
  const todosIsQuery = useTodosIds();
  const isFetching = useIsFetching();

  // if (todosIsQuery.isPending) {
  //   return <span>loading...</span>;
  // }

  // if (todosIsQuery.isError) {
  //   return <span>Error!</span>;
  // }

  return (
    <>
      <p>Query function status : {todosIsQuery.fetchStatus}</p> //backend
      <p>Query data status : {todosIsQuery.status}</p> //frontend
      <p>Global isFetching: {isFetching}</p>
      {todosIsQuery.data?.map((id) => (
        <p key={id}>{id}</p>
      ))}
    </>
  );
}
