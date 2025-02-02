import React, {useState, useEffect} from "react";
import { FaEye } from "react-icons/fa";
import pagoda1 from "../../../../assets/pagoda/pagoda1.jpg";
import pagoda2 from "../../../../assets/pagoda/pagoda2.jpg";
import pagoda3 from "../../../../assets/pagoda/pagoda3.jpg";
import { Link } from "react-router-dom";
import axios from "axios"
import axiosInstance from "../../../AxiosInstance";

const PostList = ({ changeGridView }) => {
  const token = localStorage.getItem('token');
  const [posts, setPosts] = useState([]);
  useEffect(()=>{
    const fetchPosts = async () =>{
      try{
      const response = await axiosInstance.get('/api/posts');
      setPosts(response.data)
      }catch(error){
        toast.error("Error occured", error)
      }
    };
    fetchPosts();
  },[]);
  return (
    <div className={`p-4 grid grid-cols-1 ${changeGridView ? "md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5" : "md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"} gap-6 mb-10`}>
      {posts.map(({ id, title, description, image_path, created_at, category_name }) => (
        <Link to={`/dashboard/post-detail/${category_name}/${id}`}>
          <div
           
           className=" h-[280px] shadow-md rounded-lg cursor-pointer transform transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl"
         >
           <div className=" w-full h-full">
             <img
               src={image_path}
               alt=""
               className="object-cover w-full h-full rounded-lg hover:opacity-90 transition-opacity duration-300"
             />
           </div>

           <div className="absolute bottom-0 left-2 right-2 bg-white h-[80px] p-4 shadow-lg rounded-lg flex items-center hover:bg-gray-100 transition-colors duration-300">
             <div className="grid grid-cols-1 w-full">
               <div>
                 <div>
                   <h1 className="font-bold text-1xl text-[#14637A]">
                     {title}
                   </h1>
                   <p className="text-xs text-gray-700">{created_at}</p>
                 </div>
                 <div className="mt-2 flex flex-row justify-between">
                   <div className="flex flex-row">
                   <p className="text-sm line-clamp-2 break-words">{description}</p>
                   </div>
                 </div>
               </div>
             </div>
           </div>
         </div>
       </Link>
     ))}
   </div>
 );
};

export default PostList;