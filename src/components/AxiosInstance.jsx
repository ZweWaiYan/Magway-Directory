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
        if (error.response) {
            const { status, data } = error.response;

            if (status === 403) {
                const token = localStorage.getItem('token');
                if (token) {
                    try {
                        const decoded = jwtDecode(token);
                        const currentTime = Date.now() / 1000;

                        if (decoded.exp < currentTime) {
                            toast.error('Session expired. Please log in again.');
                            localStorage.removeItem('token');
                            window.location.replace("/home")
                        } else {
                            if (data.message === 'Your account is banned.') {
                                toast.error('Your account is banned. Please contact support.');
                                localStorage.removeItem('token');
                                window.location.reload();
                            }
                        }
                    } catch (err) {
                        console.error('Invalid token', err);
                        toast.error('Unauthorized: Invalid token.');
                    }
                }
            } else if (status === 401) {
                toast.error('Unauthorized: Please log in.');
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
