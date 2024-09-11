import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

const App = () => {
  const queryClient = useQueryClient();

  const [title, setTitle] = useState("");
  const [views, setViews] = useState(0);
  const [text, setText] = useState("");
  const [postId, setPostId] = useState(0);
  const [comments, setComments] = useState("");

  //posts 불러오는 함수
  const getPosts = async () => {
    console.log("getPosts 호출! @@@@2");
    const response = await axios.get("http://localhost:4000/posts");
    console.log(response);
    return response.data;
  };

  //posts 추가 함수
  const addPost = async (newPost) => {
    console.log("addPost 호출!!!!!!!!!!!!!!!!1 ");
    await axios.post("http://localhost:4000/posts", newPost);
  };

  //profile 불러오는 함수
  const getProfile = async () => {
    console.log("getProfile 호출! ");
    const response = await axios.get("http://localhost:4000/profile");
    return response;
  };

  //comments 함수
  const addComment = async ({ text, postId }) => {
    await axios.post("http://localhost:4000/comments", { text, postId });
  };

  // * useQuery *
  const {
    data: posts,
    isPending: postLoading,
    isError: postError,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });

  const {
    data: profile,
    isPending: profileLoding,
    isError: profileError,
  } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });

  // * useMutation *
  const addMutation = useMutation({
    mutationFn: addPost,
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
    },
  });

  const addCommentMutation = useMutation({
    mutationFn: addComment,
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });

  if (postLoading || profileLoding) {
    return <div>loading...</div>;
  }

  if (postError || profileError) {
    return <div>Error...</div>;
  }

  return (
    <div>
      <h1>여기는 메인 페이지 입니다.</h1>
      <input
        type="text"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <input
        type="text"
        value={views}
        onChange={(e) => {
          setViews(e.target.value);
        }}
      />
      <button
        onClick={() => {
          addMutation.mutate({ title, views });
        }}
      >
        추가
      </button>

      {posts.map((post) => {
        return (
          <>
            <div key={post.id}>
              <h2>
                제목 : {post.title} 조회수 : {post.views}
              </h2>

              <input
                type="text"
                value={comments}
                onChange={(e) => {
                  setComments(e.target.value);
                }}
              />
              <button
                onClick={() => {
                  addCommentMutation.mutate({ text, postId });
                }}
              >
                댓글보기
              </button>

              {comments.map((comment) => {
                return (
                  <div key={comment.id}>
                    {comment.text}
                    {comment.postId}
                  </div>
                );
              })}
            </div>
          </>
        );
      })}
    </div>
  );
};

export default App;
