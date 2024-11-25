// src/pages/OnBoardingPage.js
import React from 'react';
import Description from '../components/onboard/Description';
import GetStartedButton from '../components/onboard/GetStartedButton';
import WelcomeMessage from '../components/onboard/WelcomeMessage';

const OnBoardingPage = () => {
    return (
        <div className="flex flex-col justify-between items-center h-screen p-12 bg-white bg-gradient-to-br from-transparent via-blue-400/30 to-white rounded-lg mx-auto text-center relative">
            {/* 로고를 수평 중앙으로 정렬 */}
            <div className="w-full max-w-xs mb-8 flex justify-center z-10">
                <div
                    className="w-[199px] h-[199px] bg-center bg-contain bg-no-repeat mb-8"
                    style={{ backgroundImage: `url('${process.env.PUBLIC_URL}/wibee.png')` }}
                ></div>
            </div>

            <div className="w-full text-center">
                <WelcomeMessage />
                <Description />
            </div>
            <GetStartedButton />
        </div>
    );
};

export default OnBoardingPage;
