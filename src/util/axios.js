// src/utils/axios.js
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: '/api',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

// 응답 인터셉터 추가
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // 인증 에러 처리 (예: 로그인 페이지로 리다이렉트)
            window.location.href = '/view/login';
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
