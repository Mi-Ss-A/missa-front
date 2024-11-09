import React, { useState } from 'react';
import Header from './Header';
import InputField from './InputField';
import Button from './Button';
import Footer from './Footer';

const LoginForm = ({ onLogin, error, loading }) => {
    const [userId, setUserId] = useState('');
    const [userPassword, setUserPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin(userId, userPassword); // 부모 컴포넌트로 ID와 비밀번호 전달
    };

    return (
        <div className="flex flex-col items-center w-11/12 max-w-md mx-auto p-8 bg-white rounded-lg shadow-lg">
            <Header />
            <form onSubmit={handleSubmit} className="w-full">
                <InputField
                    type="text"
                    placeholder="Enter Your ID"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)} // ID 값 업데이트
                />
                <InputField
                    type="password"
                    placeholder="Password"
                    value={userPassword}
                    onChange={(e) => setUserPassword(e.target.value)} // 비밀번호 값 업데이트
                />
                <Button text={loading ? 'Logging in...' : 'Login'} onClick={handleSubmit} /> {/* onClick 추가 */}
            </form>
            {error && <p className="text-red-500 mt-4">{error}</p>} {/* 오류 메시지 표시 */}
            <Footer />
        </div>
    );
};

export default LoginForm;
