import React from 'react';
import { useNavigate } from 'react-router-dom';
import SignUpForm from '../components/signup/SignUpForm';
import BasicLayout from '../layouts/BasicLayout';

const SignUpPage = () => {
    const navigate = useNavigate();

    const handleSuccess = () => {
        alert('회원가입이 완료되었습니다!');
        navigate('/view/login');
    };

    return (
        <BasicLayout title="Sign Up" showMenu={false}>
            <div className="flex flex-col justify-center items-center min-h-full p-12 bg-white bg-gradient-to-br from-transparent via-blue-400/30 to-white">
                <SignUpForm onSuccess={handleSuccess} />
            </div>
        </BasicLayout>
    );
};

export default SignUpPage;
