import { ArrowRight } from 'lucide-react';
import { forwardRef,useRef, useState,useImperativeHandle  } from 'react';
import axios from 'axios';

const ChatInput = forwardRef(({ message, setMessage, onSendMessage, lastUserMessage }, ref) => {
    const [isLoading, setIsLoading] = useState(false);
    const textareaRef = useRef(null);

    // API 요청 처리를 위한 공통 함수
    const handleApiRequest = async (messageText) => {
        try {
            const response = await axios.post('http://localhost:5000/api/chat', {
                message: messageText
            });

            if (response.status === 200) {
                return response.data.response;
            }
        } catch (error) {
            console.error('Error in API request:', error);
            throw error;
        }
    };

    // 메시지 전송 처리
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (message.trim()) {
            setIsLoading(true);
            try {
                let responseMessage;
                const portfolioKeywords = ['portfolio', '포트 폴리오', '포트폴리오', 'portpolio', '포폴'];

                // 메시지에 포트폴리오/portfolio 단어가 포함되어 있는지 확인
                const isPortfolioRelated = portfolioKeywords.some(keyword => 
                    message.toLowerCase().includes(keyword.toLowerCase())
                );
            
                
                if (isPortfolioRelated) {
                    // 포트폴리오 관련 API 호출
                    responseMessage = await handlePortfolioApiRequest(message);
                } else {
                    // 기존 API 호출
                    responseMessage = await handleApiRequest(message);
                }
                
                onSendMessage(message, responseMessage);
                setMessage('');
                if (textareaRef.current) {
                    textareaRef.current.style.height = '40px';
                }
            } catch (error) {
                console.error('Error sending message:', error);
            } finally {
                setIsLoading(false);
            }
        }
    };

    // 포트폴리오 전용 API 요청 함수
    const handlePortfolioApiRequest = async (messageText) => {
        return console.log("portfolio api 전송!");
        
    };

    //  // 포트폴리오 전용 API 요청 함수
    //  const handlePortfolioApiRequest = async (messageText) => {
    //     const response =  await axios.post('http://localhost:5000/api/portfolio', {
       
    //         message: messageText
    //     });
        
    //     if (!response.ok) {
    //         throw new Error('Portfolio API request failed');
    //     }
        
    //     return await response.json();
    // };

    // Regenerate 처리
    const handleRegenerate = async () => {
        if (lastUserMessage) {
            setIsLoading(true);
            try {
                const regeneratedMessage = await handleApiRequest(lastUserMessage);
                if (regeneratedMessage) {
                    onSendMessage(lastUserMessage, regeneratedMessage);
                }
            } catch (error) {
                console.error('Error regenerating response:', error);
            } finally {
                setIsLoading(false);
            }
        }
    };

// 부모 컴포넌트에서 접근할 수 있는 메서드 노출
    useImperativeHandle(ref, () => ({
        handleRegenerate
    }));

    // 텍스트 영역 높이 자동 조정
    const handleTextAreaChange = (e) => {
        setMessage(e.target.value);
        e.target.style.height = '40px';
        e.target.style.height = `${e.target.scrollHeight}px`;
    };

    return (
        <div className="p-4 bg-white border-t">
            {isLoading && (
                <div className="mt-4 text-center text-gray-500">Loading... 잠시만 기다려주세요...</div>
            )}

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
        </div>
    );
});

ChatInput.displayName = 'ChatInput';

export default ChatInput;