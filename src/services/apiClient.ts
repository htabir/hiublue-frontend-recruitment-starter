import axios from 'axios';
import { useAuth } from '@/contexts/AuthContext';
import toast from 'react-hot-toast';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://dummy-1.hiublue.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Add Token to Headers
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Handle Global Errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    if (status === 401) {
      useAuth().logout();
    } else if (status === 500) {
      toast.error('Server error. Please try again later.');
    } else {
      toast.error(error.response?.data?.message || 'Something went wrong.');
    }
    return Promise.reject(error);
  }
);

export default apiClient;
