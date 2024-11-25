// src/pages/SplashPage.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import WelcomeLoading from '../components/loading/WelcomeLoading';

const SplashPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // 3초 후 onboarding으로 이동
        const timer = setTimeout(() => {
            navigate('/view/onboarding');
        }, 3000);

        return () => clearTimeout(timer); // cleanup
    }, [navigate]);

    return (
        <div>
            <WelcomeLoading />
        </div>
    );
};

export default SplashPage;
