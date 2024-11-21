import React, { useState } from 'react';
import InputField from './InputField';
import Button from './Button';

const LoginForm = ({ onLogin, error, loading }) => {
    const [userId, setUserId] = useState('');
    const [userPassword, setUserPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin(userId, userPassword);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <InputField
                type="text"
                placeholder="Enter Your ID"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
            />
            <InputField
                type="password"
                placeholder="Password"
                value={userPassword}
                onChange={(e) => setUserPassword(e.target.value)}
            />
            <Button text={loading ? 'Logging in...' : 'Login'} />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <p className="text-gray-600 text-sm mt-4">
                Create New Account?{' '}
                <a href="/signup" className="text-blue-600 hover:underline">
                    Sign up
                </a>
            </p>
        </form>
    );
};

export default LoginForm;
