import React, { useState } from 'react';
import axios from 'axios';
import SignUpInput from './SignUpInput';
import SignUpSelect from './SignUpSelect';
import SignUpButton from './SignUpButton';

const SignUpForm = ({ onSuccess }) => {
    const [formData, setFormData] = useState({
        userId: '',
        userPassword: '',
        userName: '',
        userEmail: '',
        userPhoneNumber: '',
        userDateOfBirth: '',
        userGender: '',
        userAddress: '',
        userType: '',
    });
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // UserType 옵션 생성
    const userTypeOptions = [
        { value: 'UT001', label: '대학생' },
        { value: 'UT002', label: '사회초년생' },
        { value: 'UT003', label: '신혼' },
        { value: 'UT004', label: '자녀영유아' },
        { value: 'UT005', label: '자녀의무교육' },
        { value: 'UT006', label: '자녀대학생' },
        { value: 'UT007', label: '중년기타' },
        { value: 'UT008', label: '재혼' },
        { value: 'UT009', label: '은퇴' },
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await axios.post(
                // 'http://localhost:8081/api/users/signUp',
                '/api/users/signUp',
                { ...formData },
                { headers: { 'Content-Type': 'application/json' } }
            );

            if (response.data.success) {
                onSuccess();
            } else {
                setError(response.data.message || '회원가입에 실패했습니다.');
            }
        } catch (err) {
            setError(err.response?.data?.message || '서버 오류가 발생했습니다.');
        }
    };

    return (
        <form className="w-full max-w-md bg-white p-6 rounded-lg shadow" onSubmit={handleSubmit}>
            <SignUpInput label="아이디" name="userId" value={formData.userId} onChange={handleChange} />
            <SignUpInput
                label="비밀번호"
                name="userPassword"
                type="password"
                value={formData.userPassword}
                onChange={handleChange}
            />
            <SignUpInput label="이름" name="userName" value={formData.userName} onChange={handleChange} />
            <SignUpInput
                label="이메일"
                name="userEmail"
                type="email"
                value={formData.userEmail}
                onChange={handleChange}
            />
            <SignUpInput
                label="전화번호"
                name="userPhoneNumber"
                value={formData.userPhoneNumber}
                onChange={handleChange}
            />
            <SignUpInput
                label="생년월일"
                name="userDateOfBirth"
                type="date"
                value={formData.userDateOfBirth}
                onChange={handleChange}
            />
            <SignUpSelect
                label="성별"
                name="userGender"
                value={formData.userGender}
                onChange={handleChange}
                options={[
                    { value: 'M', label: '남성' },
                    { value: 'F', label: '여성' },
                ]}
            />
            <SignUpInput label="주소" name="userAddress" value={formData.userAddress} onChange={handleChange} />
            <SignUpSelect
                label="사용자 유형"
                name="userType"
                value={formData.userType}
                onChange={handleChange}
                options={userTypeOptions}
            />

            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <SignUpButton label="회원가입" />
        </form>
    );
};

export default SignUpForm;
