import React from 'react';
import { useNavigate } from 'react-router-dom';

const Footer = ({ signupPath = '/view/signup' }) => {
    const navigate = useNavigate();

    const handleSignUpClick = () => {
        navigate(signupPath);
    };

    return (
        <footer className="text-center mt-4">
            <p className="text-sm text-gray-500">
                Don't have an account?{' '}
                <button onClick={handleSignUpClick} className="text-blue-500 hover:underline focus:outline-none">
                    Sign up
                </button>
            </p>
        </footer>
    );
};

export default Footer;
