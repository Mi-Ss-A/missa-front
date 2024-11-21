import React from 'react';

const Button = ({ text }) => {
    return (
        <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition"
        >
            {text}
        </button>
    );
};

export default Button;
