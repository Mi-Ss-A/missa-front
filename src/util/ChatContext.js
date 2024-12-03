import React, { createContext, useContext, useState } from 'react';

const ChatContext = createContext();

export const useChat = () => useContext(ChatContext);

export const ChatProvider = ({ children }) => {
    const [messages, setMessages] = useState([]); // 항상 빈 배열로 초기화

    const value = { messages, setMessages };
    return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};
