import React from 'react';
import './GetStartedButton.css';
import { useNavigate } from 'react-router-dom';

const GetStartedButton = () => {
    const navigate = useNavigate();

    const handleGetStartedClick = () => {
        // 페이지 전환 구현 (애니메이션 추가 가능)
        navigate('/login');
    };

    return (
        <button className="get-started-button" onClick={handleGetStartedClick}>
            Get started
        </button>
    );
};

export default GetStartedButton;
