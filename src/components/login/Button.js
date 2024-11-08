// src/components/login/Button.js
import React from 'react';

const Button = ({ text, onClick }) => {
    return (
        <button
            className="w-full max-w-xs h-14 bg-blue-500 text-white font-semibold text-lg rounded-lg hover:bg-blue-600 transition duration-200 ease-in-out"
            onClick={onClick}
        >
            {text}
        </button>
    );
};

export default Button;
