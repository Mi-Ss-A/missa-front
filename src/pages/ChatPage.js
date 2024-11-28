// pages/ChatPage.js
import { useEffect, useRef, useState } from 'react';
import ChatInput from '../components/chat/ChatInput';
import ChatMessage from '../components/chat/ChatMessage';
import RegenerateButton from '../components/chat/RegenerateButton';
import BasicLayout from '../layouts/BasicLayout';

const ChatPage = () => {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [lastUserMessage, setLastUserMessage] = useState('');
    const chatInputRef = useRef(null);
    const messageEndRef = useRef(null);

    const initialMessages = [
        '금융 포트폴리오를 만들어주세요!',
        '여행 관련 혜택이 많은 카드를 추천해주세요!',
        '신용대출 만기가 다가오는데 연장은 어떻게 신청 할 수 있나요?',
        '마이너스통장의 대출이자는 언제 출금 되나요?',
    ];

    const handleInitialButtonClick = (text) => {
        if (lastUserMessage === text) return;
        setLastUserMessage(text);
        chatInputRef.current?.handleSubmit(null, text);
    };

    const handleSendMessage = (userMessage, responseMessage, portfolioUrls = []) => {
        setLastUserMessage(userMessage);
    
        // 메시지와 포트폴리오 URL을 각각 상태로 관리
        setMessages((prev) => [
            ...prev,
            { text: userMessage, isUser: true, timestamp: new Date() },
            { text: responseMessage, isUser: false, timestamp: new Date() },
        ]);
    
        // URL을 메시지 리스트에 링크 형태로 추가
        if (portfolioUrls.length > 0) {
            setMessages((prev) => [
                ...prev,
                ...portfolioUrls.map((url) => ({
                    text: url,
                    isUser: false,
                    isLink: true, // 링크인지 표시
                    timestamp: new Date(),
                })),
            ]);
        }
    };
    

    const handleRegenerateClick = () => {
        chatInputRef.current?.handleRegenerate(); // ChatInput의 handleRegenerate 호출
    };

    useEffect(() => {
        messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <BasicLayout title="WIBEE CHAT" subtitle="FINANCIAL BUTLER" showMenu={true}>
            <div className="flex justify-center bg-blue-50 h-full">
                <div className="max-w-screen-lg w-full px-4 flex flex-col h-full">
                    {/* 메시지 목록 */}
                    <div className="flex-1 px-2 md:px-4 overflow-y-auto pb-20 pt-8 scrollbar-hide">
                        {messages.length > 0 && (
                            <div className="space-y-2 mb-4">
                                {messages.map((message, index) => (
                                    <ChatMessage key={index} text={message.text} isUser={message.isUser} />
                                ))}
                                {!messages[messages.length - 1]?.isUser && (
                                    <RegenerateButton onRegenerate={handleRegenerateClick} />
                                )}
                            </div>
                        )}
                        {messages.length === 0 && (
                            <div className="space-y-4 flex flex-col items-center px-4 mt-10">
                                {initialMessages.map((text, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleInitialButtonClick(text)}
                                        className="w-full md:w-2/5 p-4 md:p-8 text-center bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
                                    >
                                        {text}
                                    </button>
                                ))}
                            </div>
                        )}
                        <div ref={messageEndRef} />
                    </div>

                    {/* 입력창 */}
                    <ChatInput
                        ref={chatInputRef}
                        message={inputMessage}
                        setMessage={setInputMessage}
                        onSendMessage={handleSendMessage}
                        lastUserMessage={lastUserMessage}
                    />
                </div>
            </div>
        </BasicLayout>
    );
};

export default ChatPage;
