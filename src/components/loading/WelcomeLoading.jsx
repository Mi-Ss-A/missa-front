// src/components/WelcomeLoading.js
import React from 'react';
import './WelcomeLoading.css'; // 스타일시트

const WelcomeLoading = () => {
    return (
        <div className="welcome-loading">
            <div className="logo-container">
                <div className="wibee-logo"></div>
            </div>
            <div className="title-container">
                <p className="title-text">WIBEECHAT</p>
                <p className="version-text">Version 1.0</p>
            </div>
        </div>
    );
};

export default WelcomeLoading;
