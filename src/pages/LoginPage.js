// src/pages/LoginPage.js
import React from 'react';
import BasicLayout from '../layouts/BasicLayout';
import LoginForm from '../components/login/LoginForm';
import '../components/login/LoginPage.css';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const navigate = useNavigate(); // useNavigate 사용

    const handleLogin = () => {
        navigate('/chat'); // /chat으로 이동
    };

    return (
        <BasicLayout>
            <div className="LoginPage">
                <LoginForm onLogin={handleLogin} />
            </div>
        </BasicLayout>
    );
};

export default LoginPage;
