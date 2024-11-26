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
