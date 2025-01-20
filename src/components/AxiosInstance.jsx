import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const axiosInstance = axios.create({
    baseURL: '', 
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    (response) => response, 
    (error) => {
        if (error.response && error.response.status === 403) {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const decoded = jwtDecode(token);
                    const currentTime = Date.now() / 1000;
                    if (decoded.exp < currentTime) {
                        window.location.reload();
                    }
                } catch (err) {
                    console.error('Invalid token', err);
                }
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
