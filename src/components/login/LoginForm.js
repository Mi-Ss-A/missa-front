// src/components/login/LoginForm.js
import React from 'react';
import Header from './Header';
import InputField from './InputField';
import Button from './Button';
import Footer from './Footer';
import './LoginForm.css';
import { Navigate } from 'react-router-dom';

const LoginForm = ({ onLogin }) => {
    return (
        <div className="login-form">
            <Header />
            <InputField type="text" placeholder="Enter Your ID" />
            <InputField type="password" placeholder="Password" />
            <Button text="Login" onClick={onLogin} />
            <Footer />
        </div>
    );
};

export default LoginForm;
