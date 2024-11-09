import React from 'react';

const Button = ({ text, onClick }) => {
    return (
        <button
            type="submit"
            className="w-full max-w-xs h-14 bg-blue-500 text-white font-semibold text-lg rounded-lg hover:bg-blue-600 transition duration-200 ease-in-out"
            onClick={onClick} // 클릭 이벤트 핸들러 추가
        >
            {text}
        </button>
    );
};

export default Button;
