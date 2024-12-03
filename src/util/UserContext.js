import React, { createContext, useContext, useState } from 'react';

// Context 생성
const UserContext = createContext();

// Context를 제공하는 Provider
export const UserProvider = ({ children }) => {
    const [userStatus, setUserStatus] = useState(null);

    const updateUserStatus = (status) => {
        setUserStatus(status);
    };

    const isPortfolioAllowed = () => userStatus === 'V'; // 상태 확인 함수

    return (
        <UserContext.Provider value={{ userStatus, updateUserStatus, isPortfolioAllowed }}>
            {children}
        </UserContext.Provider>
    );
};

// Context를 쉽게 가져오는 Hook
export const useUser = () => useContext(UserContext);
