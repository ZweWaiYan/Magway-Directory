import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Users from "./Page/Users";
import Posts from "./Page/Posts";
import Dashboard from "./Page/Dashboard";
import CreatePost from "./Page/CreatePost";
import PostDetail from "./Page/Posts/PostDetail";
import EditPost from "./Page/EditPost";
import Setting from "./Page/Setting";
import SessionTimeoutModal from "./Page/User/SessionTimeoutModal";

import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function AdminRoute() {
  return (
    <Router>
      {/* ToastContainer */}
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />

      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="posts" element={<Posts />} />
          <Route path="create-post" element={<CreatePost />} />
          <Route path="post-detail/:category/:id" element={<PostDetail />} />
          <Route path="edit-post/:id" element={<EditPost />} />
          <Route path="setting" element={<Setting />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default AdminRoute;
