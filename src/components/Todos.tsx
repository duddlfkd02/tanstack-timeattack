import { SubmitHandler } from "react-hook-form";
import { useCreateTodo } from "../services/mutations";
import { useTodos, useTodosIds } from "../services/queries";
import { Todo } from "../types/todo";

export default function Todos() {
  const todosIsQuery = useTodosIds();
  const todosQueries = useTodos(todosIsQuery.data);

  const createTodoMutation = useCreateTodo();

  const handleCreateTodoSubmit: SubmitHandler<Todo> = (data) => {
    createTodoMutation.mutate(data);
  };

  return (
    <>
      <form onSubmit={}>
        {todosIsQuery.data?.map((id) => (
          <p key={id}>{id}</p>
        ))}

        <ul>
          {todosQueries.map(({ data }) => (
            <li key={data?.id}>
              <div>Id: {data?.id}</div>
              <span>
                <strong>Title:</strong>
                {data?.title} <strong>Description:</strong>
                {data?.description}
              </span>
            </li>
          ))}
        </ul>
      </form>
    </>
  );
}
