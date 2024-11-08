// src/components/login/Footer.js
import React from 'react';

const Footer = () => {
    return (
        <footer className="text-center mt-5">
            <p className="text-base text-gray-400 font-sans">
                Create New Account?{' '}
                <a href="/signup" className="text-gray-800 hover:underline">
                    Sign up
                </a>
            </p>
        </footer>
    );
};

export default Footer;
