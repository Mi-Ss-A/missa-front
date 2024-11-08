// src/components/login/LoginForm.js
import React from 'react';
import Header from './Header';
import InputField from './InputField';
import Button from './Button';
import Footer from './Footer';

const LoginForm = ({ onLogin }) => {
    return (
        <div className="flex flex-col items-center w-11/12 max-w-md mx-auto p-8 bg-white rounded-lg shadow-lg">
            <Header />
            <InputField type="text" placeholder="Enter Your ID" />
            <InputField type="password" placeholder="Password" />
            <Button text="Login" onClick={onLogin} />
            <Footer />
        </div>
    );
};

export default LoginForm;
