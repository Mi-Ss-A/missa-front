// pages/ChatPage.js
import { useState } from 'react';
import BasicLayout from '../layouts/BasicLayout';
import ChatInput from '../components/chat/ChatInput';
import RegenerateButton from '../components/chat/RegenerateButton';
import ChatMessage from '../components/chat/ChatMessage';

const ChatPage = () => {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [lastUserMessage, setLastUserMessage] = useState('');

    // 미리 정의된 메시지 목록
    const predefinedMessages = [
        "내 거래내역 사칭 확인 (유료)",
        "어떠한 용도 카드 제공확인",
        "공격적인 투자 상품로 추천해줘"
    ];

    const handleButtonClick = (text) => {
        setInputMessage(text);
        handleSendMessage(text);
    };

    const handleRegenerate = async () => {
        if (lastUserMessage) {
            // 마지막 봇 메시지 제거
            const newMessages = messages.slice(0, -1);
            setMessages(newMessages);

            // 새로운 응답 생성
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
            setLastUserMessage(text); // 마지막 사용자 메시지 저장
            setMessages([
                ...messages,
                { text, isUser: true, timestamp: new Date() }
            ]);

            // 봇 응답 추가
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
                    <div className="space-y-2 mb-4 py-4">
                        {messages.map((message, index) => (
                            <ChatMessage
                                key={index}
                                text={message.text}
                                isUser={message.isUser}
                            />
                        ))}
                    </div>

                    {/* Regenerate 버튼 */}
                    {messages.length > 0 && !messages[messages.length - 1].isUser && (
                        <RegenerateButton onRegenerate={handleRegenerate} />
                    )}

                    {/* 미리 정의된 버튼들 */}
                    {messages.length === 0 && (
                        <div className="space-y-4">
                            {predefinedMessages.map((text, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleButtonClick(text)}
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