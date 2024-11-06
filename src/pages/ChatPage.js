
// pages/ChatPage.js
import { useState } from 'react';
import BasicLayout from '../layouts/BasicLayout';
import ChatInput from '../components/chat/ChatInput';
import ChatMessage from '../components/chat/ChatMessage';
import RegenerateButton from '../components/chat/RegenerateButton';

const ChatPage = () => {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [lastUserMessage, setLastUserMessage] = useState('');

    // 초기 버튼 메시지 리스트
    const initialMessages = [
        "Remembers what user said earlier in the conversation",
        "Allows user to provide follow-up corrections With Ai"
    ];

    const handleInitialButtonClick = (text) => {
        setMessages(prev => [...prev, {
            text,
            isUser: true,
            timestamp: new Date()
        }]);
        setLastUserMessage(text);

        setTimeout(() => {
            setMessages(prev => [...prev, {
                text: `응답: ${text}에 대한 답변입니다.`,
                isUser: false,
                timestamp: new Date()
            }]);
        }, 1000);
    };

    const handleRegenerate = async () => {
        if (lastUserMessage) {
            const newMessages = messages.slice(0, -1);
            setMessages(newMessages);

            setTimeout(() => {
                setMessages(prev => [...prev, {
                    text: `새로 생성된 응답: ${lastUserMessage}에 대한 답변입니다.`,
                    isUser: false,
                    timestamp: new Date()
                }]);
            }, 1000);
        }
    };

    const handleSendMessage = (text) => {
        if (text.trim()) {
            setLastUserMessage(text);
            setMessages([
                ...messages,
                { text, isUser: true, timestamp: new Date() }
            ]);

            setTimeout(() => {
                setMessages(prev => [
                    ...prev,
                    {
                        text: `응답: ${text}에 대한 답변입니다.`,
                        isUser: false,
                        timestamp: new Date()
                    }
                ]);
            }, 1000);
        }
    };

    return (
        <BasicLayout>
            <div className="flex flex-col h-screen bg-blue-50">
                {/* 로고 섹션 */}
                <div className="flex justify-center my-8">
                    <div className="text-center mt-2">
                        <h1 className="text-xl font-bold text-blue-600">WIBEE CHAT</h1>
                        <p className="text-sm text-blue-400">FINANCIAL BUTLER</p>
                    </div>
                </div>

                {/* 메시지 목록 섹션 */}
                <div className="flex-1 px-4 overflow-y-auto mb-16">
                    {messages.length > 0 && (
                        <div className="space-y-2 mb-4">
                            {messages.map((message, index) => (
                                <ChatMessage
                                    key={index}
                                    text={message.text}
                                    isUser={message.isUser}
                                />
                            ))}

                            {/* Regenerate 버튼 - 마지막 메시지가 봇의 메시지일 때만 표시 */}
                            {!messages[messages.length - 1]?.isUser && (
                                <RegenerateButton onRegenerate={handleRegenerate} />
                            )}
                        </div>
                    )}

                    {/* 초기 버튼들 */}
                    {messages.length === 0 && (
                        <div className="space-y-4">
                            {initialMessages.map((text, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleInitialButtonClick(text)}
                                    className="w-full p-4 text-left bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
                                >
                                    {text}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* 메시지 입력 컴포넌트 */}
                <div className="fixed bottom-0 left-0 right-0">
                    <ChatInput
                        message={inputMessage}
                        setMessage={setInputMessage}
                        onSendMessage={handleSendMessage}
                    />
                </div>
            </div>
        </BasicLayout>
    );
};

export default ChatPage;