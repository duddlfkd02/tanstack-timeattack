# TanStack Query 복습하기

### 👩🏻‍💻 목적 :

1. `TanStack Query`의 기초 사용법을 익힌다. (✅ `mutation` 확실히 익히기)
2. 부트캠프 강의에서는 사용하지 않았던 다양한 메소드 옵션들을 접하고 활용한다.
3. `React-Hook-Form` 을 사용한 Todo-List `form` 을 만든다.

### 📆 기간 :

24.11.25 - 24.11.26 (구현 + 복습)

### 📀 참고 영상 :

https://youtu.be/3e-higRXoaM?si=hhnYeKG3xKZ_9V_Y

---

## 📕 Mutation Options

- `onSettled` : `mutation`이 성공해서 성공한 데이터 또는 `error`가 전달될 때 실행 (성공, 실패 상관없이 결과 전달!)

- `onMutate` : `mutation` 함수 로직이 실행되기 전에 실행 -> `mutation` 함수가 받을 동일한 변수가 전달됨.
  👏 **낙관적 업데이트 (optimistic update)** 사용 시 유용

- `mutateAsync` : `mutate` 와 동일하지만 `Promise` 를 반환함

---

## 💥 트러블슈팅

### 발생한 문제

: Todo 목록을 완료 버튼을 눌러도 즉시 버튼 text가 바뀌지 않음

<img width="837" alt="mark as done 에러 발생" src="https://github.com/user-attachments/assets/88c98759-0327-4c48-9466-d59ac81c6094">

`DevTools` 에는 `muatate success` 로 나오지만 버튼 text 는 바뀌지 않고 일정시간이 지나야 바뀌고 있었음

<br />

### 해결방법

낙관적 업데이트로 `updateTodo` 함수 수정하기

```tsx
export default function useUpdateTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Todo) => updateTodo(data),

    onMutate: async (newTodo) => {
      const prevTodos = queryClient.getQueryData<Todo[]>(["todos"]);

      queryClient.setQueryData<Todo[]>(["todos"], (old) =>
        old?.map((todo) =>
          todo.id === newTodo.id ? { ...todo, checked: newTodo.checked } : todo
        )
      );

      return { prevTodos };
    },

    onError: (error, newTodo, context) => {
      queryClient.setQueryData(["todos"], context?.prevTodos);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
}
```

- `setQueryData` : 쿼리의 캐시된 데이터를 즉시 업데이트하는 데 사용할 수 있는 동기 함수 <br />
  _`setQueryData` 와 `fetchQuery`를 사용하는 것의 차이점 은 `setQueryData` 는 동기화되어 있고 이미 동기적으로 데이터를 사용할 수 있다고 가정한다는 것_
- `getQueryData` : 기존 쿼리의 캐시된 데이터를 가져오는 데 사용할 수 있는 동기 함수 <br />
  쿼리가 존재하지 않으면 `undefined`가 반환

### 결과확인

<img width="837" alt="낙관적업데이트 적용" src="https://github.com/user-attachments/assets/0b512c24-6c84-46a2-a79e-89495b88d1fb">
