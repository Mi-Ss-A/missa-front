// src/components/button/GetStartedButton.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const GetStartedButton = () => {
    const navigate = useNavigate(); // useNavigate 훅을 사용하여 navigate 함수 가져오기

    const handleClick = () => {
        navigate('/view/login'); // 버튼 클릭 시 /login으로 이동
    };

    return (
        <button
            className="bg-[#00497a] text-white border-0 py-4 px-8 text-lg font-medium rounded-lg cursor-pointer transition-colors duration-300 hover:bg-[#003f64]"
            onClick={handleClick}
        >
            <span className="font-sans tracking-tight">Get Started</span>
        </button>
    );
};

export default GetStartedButton;
