import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

const App = () => {
  const queryClient = useQueryClient();

  const getPosts = async () => {
    console.log("getPosts 호출! @@@@2");
    const response = await axios.get("http://localhost:4000/posts");
    console.log(response);
    return response.data;
  };

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

  const addComment = async (newComment) => {
    await axios.post(`http://localhost:4000/profile/${name}`, newComment);
  };

  const {
    data: posts,
    isPending,
    isError,
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

  const [title, setTitle] = useState("");
  const [views, setViews] = useState(0);

  if (isPending || profileLoding) {
    return <div>loading...</div>;
  }

  if (isError || profileError) {
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
              {post.title} {post.views}
              <button
                onClick={() => {
                  addCommentMutation.mutate(profile.comment);
                }}
              >
                댓글보기
              </button>
            </div>
          </>
        );
      })}
    </div>
  );
};

export default App;
