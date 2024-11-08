// src/pages/LoginPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/login/LoginForm';

const LoginPage = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/chat');
    };

    return (
        <div className="flex flex-col justify-center items-center h-screen p-12 bg-gradient-to-br from-transparent via-blue-400/30 to-white rounded-lg mx-auto text-center relative">
            {/* 로고 */}
            <div className="w-full max-w-xs mb-8 flex justify-center z-10">
                <div
                    className="w-[199px] h-[199px] bg-center bg-contain bg-no-repeat mb-8"
                    style={{ backgroundImage: "url('/wibee.png')" }}
                ></div>
            </div>
            {/* 로그인 폼 */}
            <div className="w-full max-w-md">
                <LoginForm onLogin={handleLogin} />
            </div>
        </div>
    );
};

export default LoginPage;
