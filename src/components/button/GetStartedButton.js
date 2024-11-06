// src/components/button/GetStartedButton.js
import React from 'react';
import './GetStartedButton.css'; // CSS 파일을 import 합니다.

const GetStartedButton = ({ onClick }) => {
    return (
        <button className="get-started-button" onClick={onClick}>
            <span>Get Started</span>
        </button>
    );
};

export default GetStartedButton;
