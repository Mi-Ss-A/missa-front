// src/components/WelcomeLoading.js
import React from 'react';

const WelcomeLoading = () => {
    return (
        <div className="flex flex-col justify-between items-center h-screen p-12 bg-white bg-gradient-to-br from-transparent via-blue-400/30 to-white rounded-lg mx-auto text-center relative">
            {/* 로고를 수평 중앙으로 정렬 */}
            <div className="w-full max-w-xs mb-8 flex justify-center z-10">
                <div
                    className="w-[199px] h-[199px] bg-center bg-contain bg-no-repeat mb-8"
                    style={{ backgroundImage: `url('/view/wibee.png')` }}
                ></div>
            </div>
            <div className="w-full text-center">
                <p className="font-semibold text-4xl text-blue-900 tracking-tight mb-2">WIBEECHAT</p>
                <p className="font-light text-lg text-gray-600">Version 1.0</p>
            </div>
        </div>
    );
};

export default WelcomeLoading;
