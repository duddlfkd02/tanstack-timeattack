import { useTodos, useTodosIds } from "../services/queries";

export default function Todo() {
  const todosIsQuery = useTodosIds();
  const todosQueries = useTodos(todosIsQuery.data);

  return (
    <>
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
    </>
  );
}
