import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import axiosInstance from "../AxiosInstance";

function ProtectedRoute() {
  const [isAuthorized, setIsAuthorized] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthorization = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axiosInstance.get("/api/authorize");
        console.log(response.data.message)

        if (token && response.data.authorized) {
            setIsAuthorized(true);
        } else {
            console.log(response.status)
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

  if (!isAuthorized) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
