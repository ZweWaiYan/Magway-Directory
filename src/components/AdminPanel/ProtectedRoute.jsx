import { useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import axiosInstance from "../AxiosInstance";
import { ToastContainer, toast } from "react-toastify";

function ProtectedRoute() {
  const [isAuthorized, setIsAuthorized] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthorization = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axiosInstance.get("/api/authorize");
        if (token && response.data.authorized) {
            setIsAuthorized(true);
        } else {
            setIsAuthorized(false);
        }
      } catch (error) {
            setIsAuthorized(false);
      } finally {
            setLoading(false);
      }
    };

    checkAuthorization();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if(!isAuthorized){
    return window.location.replace("/home")
  }

  return <Outlet />;
}

export default ProtectedRoute;
