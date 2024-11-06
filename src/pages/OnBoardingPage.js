// src/pages/Page1.js
import React from 'react';
import WelcomeMessage from '../components/onboard/WelcomeMessage';
import Description from '../components/onboard/Description';
import GetStartedButton from '../components/onboard/GetStartedButton';
import WibeeLogo from '../components/onboard/WibeeLogo';
import '../components/onboard/OnboardingPage.css';

const OnBoardingPage = () => {
    return (
        <div className="page-1-container">
            <div className="frame-141">
                <WibeeLogo />
                <WelcomeMessage />
                <Description />
            </div>
            <GetStartedButton />
        </div>
    );
};

export default OnBoardingPage;
