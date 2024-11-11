import { useRef,useState } from 'react';
import BasicLayout from '../layouts/BasicLayout';
import ChatInput from '../components/chat/ChatInput';
import ChatMessage from '../components/chat/ChatMessage';
import RegenerateButton from '../components/chat/RegenerateButton';

const ChatPage = () => {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [lastUserMessage, setLastUserMessage] = useState('');

    const initialMessages = ['궁금한 점을 입력 해보세요!', '샘플 텍스트'];

    const handleInitialButtonClick = (text) => {
        setMessages((prev) => [
            ...prev,
            {
                text,
                isUser: true,
                timestamp: new Date(),
            },
        ]);
        setLastUserMessage(text);
    };

    // 메시지 리스트에 새 응답을 추가
    const handleSendMessage = (userMessage, responseMessage) => {
        setLastUserMessage(userMessage);
        setMessages((prev) => [
            ...prev,
            {
                text: userMessage,
                isUser: true,
                timestamp: new Date(),
            },
            {
                text: responseMessage,
                isUser: false,
                timestamp: new Date(),
            },
        ]);
    };

       // ChatInput 컴포넌트 참조를 위한 ref 생성
       const chatInputRef = useRef(null);

       // RegenerateButton 클릭 핸들러
       const handleRegenerateClick = () => {
           // ChatInput 컴포넌트의 regenerate 메소드 호출
           chatInputRef.current?.handleRegenerate();
       };

    return (
        <BasicLayout showMenu={true}>
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
                                <ChatMessage key={index} text={message.text} isUser={message.isUser} />
                            ))}

                            {/* Regenerate 버튼 - 마지막 메시지가 봇의 메시지일 때만 표시 */}
                            {!messages[messages.length - 1]?.isUser && (
                              <RegenerateButton onRegenerate={handleRegenerateClick} />
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

                    {/* 메시지 입력 컴포넌트 */}
                    <div className="fixed bottom-0 left-0 right-0">
                        <ChatInput
                            ref={chatInputRef}
                            message={inputMessage}
                            setMessage={setInputMessage}
                            onSendMessage={handleSendMessage}
                            lastUserMessage={lastUserMessage}
                        />
                    </div>
                </div>
            </div>
        </BasicLayout>
    );
};

export default ChatPage;