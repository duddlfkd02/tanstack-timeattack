import { SubmitHandler, useForm } from "react-hook-form";
import useUpdateTodo, {
  useCreateTodo,
  useDeleteTodo,
} from "../services/mutations";
import { useTodos, useTodosIds } from "../services/queries";
import { Todo } from "../types/todo";
import styles from "./Todos.module.css";

export default function Todos() {
  const todosIsQuery = useTodosIds();
  const todosQueries = useTodos(todosIsQuery.data);

  const createTodoMutation = useCreateTodo();
  const updateTodoMutation = useUpdateTodo();
  const deleteTodoMutation = useDeleteTodo();

  const { register, handleSubmit } = useForm<Todo>();

  const handleCreateTodoSubmit: SubmitHandler<Todo> = (data) => {
    createTodoMutation.mutate(data);
  };

  const handleMarkAsDoneSubmit = (data: Todo | undefined) => {
    if (data) {
      updateTodoMutation.mutate({ ...data, checked: true });
    }
  };

  const handleDeleteTodo = async (id: number) => {
    deleteTodoMutation.mutateAsync(id);
  };

  return (
    <div className={styles.container}>
      <form
        onSubmit={handleSubmit(handleCreateTodoSubmit)}
        className={styles.form}
      >
        <h4>New todo:</h4>
        <input
          placeholder="Title"
          {...register("title")}
          className={styles.input}
        />
        <br />
        <input
          placeholder="Description"
          {...register("description")}
          className={styles.input}
        />
        <br />
        <input
          type="submit"
          disabled={createTodoMutation.isPending}
          value={createTodoMutation.isPending ? "Creating..." : "Create Todo"}
          className={styles.button}
        />
      </form>

      <ul className={styles.list}>
        {todosQueries.map(({ data }) => (
          <li key={data?.id} className={styles.listItem}>
            <div>Id: {data?.id}</div>
            <span>
              <strong>Title:</strong>
              {data?.title} <strong>Description:</strong>
              {data?.description}
            </span>
            <div>
              <button
                onClick={() => handleMarkAsDoneSubmit(data)}
                disabled={data?.checked}
                className={styles.button}
                style={{
                  marginRight: "8px",
                  background: data?.checked ? "#ccc" : "#49c797",
                }}
              >
                {data?.checked ? "Done" : "Mark as done"}
              </button>
              {data && data?.id && (
                <button
                  onClick={() => handleDeleteTodo(data.id!)}
                  className={styles.button}
                  style={{ background: "#f2717e" }}
                >
                  Delete
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
