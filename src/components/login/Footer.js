import React from 'react';

const Footer = () => {
    return (
        <footer className="text-center mt-4">
            <p className="text-sm text-gray-500">
                Create New Account?{' '}
                <a href="/signup" className="text-black font-semibold hover:underline">
                    Sign up
                </a>
            </p>
        </footer>
    );
};

export default Footer;
