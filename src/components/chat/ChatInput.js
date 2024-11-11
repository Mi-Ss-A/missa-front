import { ArrowRight } from 'lucide-react';
import { useRef } from 'react';
import { useState } from 'react';
import axios from 'axios';

const ChatInput = ({ message, setMessage, onSendMessage }) => {
    const [isLoading, setIsLoading] = useState(false); // 로딩 상태 추가
    const textareaRef = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (message.trim()) {
            setIsLoading(true); // 요청 시작 시 로딩 상태 활성화

            try {
                const response = await axios.post('http://localhost:5000/api/chat', {
                    message: message
                });

                if (response.status === 200) {
                    // 서버 응답을 ChatPage로 전달
                    onSendMessage(message, response.data.response); 
                    setMessage('');  // 메시지 초기화
                    if (textareaRef.current) {
                        textareaRef.current.style.height = '40px';
                    }
                }
            } catch (error) {
                console.error('Error sending message:', error);
                // 에러 처리: 서버 응답이 없을 때
                onSendMessage(message, '서버 오류가 발생했습니다. 다시 시도해주세요.');
                setMessage('');
            } finally {
                setIsLoading(false); // 로딩 상태 종료
            }
        }
    };

    const handleTextAreaChange = (e) => {
        setMessage(e.target.value);
        e.target.style.height = '40px';
        e.target.style.height = `${e.target.scrollHeight}px`;
    };

    return (
        <div className="p-4 bg-white border-t">
            <form onSubmit={handleSubmit} className="flex items-center gap-2">
                <div className="relative flex-1">
                    <textarea
                        ref={textareaRef}
                        value={message}
                        onChange={handleTextAreaChange}
                        placeholder="Send a message"
                        className="w-full p-3 pr-12 border rounded-lg focus:outline-none focus:border-blue-400 resize-none min-h-[40px] max-h-[200px]"
                        style={{
                            overflow: 'hidden',
                            height: '40px'
                        }}
                        rows={1}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleSubmit(e);
                            }
                        }}
                    />
                    <button
                        type="submit"
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-blue-500 hover:text-blue-600"
                    >
                        <ArrowRight size={20} />
                    </button>
                </div>
            </form>

            {isLoading && (
                <div className="mt-4 text-center text-gray-500">Loading...</div>
            )}
        </div>
    );
};

export default ChatInput;
