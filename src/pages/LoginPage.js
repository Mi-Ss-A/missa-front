import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/login/LoginForm';
import axios from 'axios';

const LoginPage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleLogin = async (userId, userPassword) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post(
                'http://localhost:8081/api/users/login',
                { userId, userPassword },
                { headers: { 'Content-Type': 'application/json' }, withCredentials: true }
            );
            if (response.data.success) {
                navigate('/chat');
            } else {
                setError('Invalid credentials.');
            }
        } catch {
            setError('Server error occurred.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col justify-between items-center h-screen p-12 bg-white bg-gradient-to-br from-transparent via-blue-400/30 to-white text-center relative">
            {/* 로고 */}
            <div className="w-full max-w-xs mb-8 flex justify-center z-10">
                <div
                    className="w-[199px] h-[199px] bg-center bg-contain bg-no-repeat mb-8"
                    style={{ backgroundImage: "url('/wibee.png')" }}
                ></div>
            </div>

            {/* 로그인 폼 */}
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold text-blue-900 mb-6">Login to WIBEECHAT</h1>
                <LoginForm onLogin={handleLogin} error={error} loading={loading} />
            </div>
        </div>
    );
};

export default LoginPage;
