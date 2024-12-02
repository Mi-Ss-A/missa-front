import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/login/LoginForm';

const LoginPage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleLogin = async (userId, userPassword) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post(
                'http://localhost:8081/api/users/login', // develop
                // '/api/users/login', // deploy
                {
                    userId: userId,
                    userPassword: userPassword,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true, // 쿠키를 포함하도록 설정
                }
            );

            if (response.data.success) {
                // 로그인 성공 시, 사용자를 채팅 페이지로 리다이렉트
                navigate('/view/chat');
            } else {
                setError(response.data.message || 'Invalid credentials.');
            }
        } catch (error) {
            if (error.response) {
                // 서버 응답이 있는 경우
                const { status, data } = error.response;
                if (status === 401) {
                    setError(data.message || '잘못된 비밀번호입니다.');
                } else if (status === 404) {
                    setError(data.message || '사용자를 찾을 수 없습니다.');
                } else {
                    setError(data.message || '서버 오류가 발생했습니다.');
                }
            } else {
                // 서버 응답이 없는 경우
                setError('네트워크 오류가 발생했습니다. 다시 시도해주세요.');
            }
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
                    style={{ backgroundImage: `url('/view/wibee.png')` }}
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
