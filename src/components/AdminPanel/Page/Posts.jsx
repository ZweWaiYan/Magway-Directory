import { main } from "framer-motion/client";
import React from "react";
import PostActions from "./Posts/PostActions";
import PostList from "./Posts/PostList";

const Posts = () => {
  return (
    <main className=" p-5 shadow-lg m-5 rounded-xl ">
      <PostActions />
      <PostList />
    </main>
  );
};

export default Posts;
