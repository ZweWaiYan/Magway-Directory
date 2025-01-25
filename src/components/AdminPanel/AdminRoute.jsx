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
import ProtectedRoute from "./ProtectedRoute";

import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function AdminRoute() {
  return (
    <Router>
      {/* ToastContainer */}
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />

      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/users" element={<Users />} />
            <Route path="/dashboard/posts" element={<Posts />} />
            <Route path="/dashboard/create-post" element={<CreatePost />} />
            <Route path="/dashboard/post-detail/:category/:id" element={<PostDetail />} />
            <Route path="/dashboard/edit-post/:id" element={<EditPost />} />
            <Route path="/dashboard/setting" element={<Setting />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default AdminRoute;
