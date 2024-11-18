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
        setError(null); // 이전 오류를 초기화
        try {
            const response = await axios.post(
                'http://usersvc.wibeechat.com/api/users/login', // 로그인 API 엔드포인트
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
            console.log('response.data: ', response.data); // 응답 데이터 확인
            if (response.data.success) {
                // 로그인 성공 시, 사용자를 채팅 페이지로 리다이렉트
                navigate('/chat');
            } else {
                // 로그인 실패 시, 오류 메시지 처리
                setError('로그인 실패. 아이디 또는 비밀번호를 확인해주세요.');
            }
        } catch (error) {
            setError('서버와의 연결에 문제가 발생했습니다.');
        } finally {
            setLoading(false);
        }
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
                <LoginForm onLogin={handleLogin} error={error} loading={loading} />
            </div>
        </div>
    );
};

export default LoginPage;
