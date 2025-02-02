import { main } from "framer-motion/client";
import React , {useState} from "react";
import PostActions from "./Posts/PostActions";
import PostList from "./Posts/PostList";

const Posts = () => {

  //Grid
  const [changeGridView, setChangeGridView] = useState();
  const handleGrid = () => {
    setChangeGridView(!changeGridView);
  }

  return (
    <main className=" p-5 shadow-lg m-5 rounded-xl ">
      <PostActions changeGridView={changeGridView} handleGrid={handleGrid} />
      <PostList changeGridView={changeGridView}/>
    </main>
  );
};

export default Posts;
