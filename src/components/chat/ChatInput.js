import { ArrowRight } from 'lucide-react';
import { forwardRef,useRef, useState,useImperativeHandle  } from 'react';
import axios from 'axios';

const ChatInput = forwardRef(({ message, setMessage, onSendMessage, lastUserMessage }, ref) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isWaitingForPeriod, setIsWaitingForPeriod] = useState(false); //포트폴리오 기간 설정 상태 
    const textareaRef = useRef(null);

    // API 요청 처리를 위한 공통 함수
    const handleApiRequest = async (messageText) => {
        try {
            const response = await axios.post('http://www.wibeechat.com/api/chat', {
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

    // 포트폴리오 요청 처리 공통 함수
const processPortfolioRequest = async (messageText,isWaiting = false) => {
    const portfolioKeywords = ['portfolio', '포트 폴리오', '포트폴리오', 'portpolio', '포폴','vhvhf','vhxmvhffldh'];
    const period = findPeriodKeyword(messageText); // 기간 추출

    // 포트폴리오 요청 && 기간입력
    if(isWaiting && period){
        const
         apiResponse = await handlePortfolioApiRequest(period);
        return{
            message:apiResponse.message || JSON.stringify(apiResponse),
            isWaitingForPeriod:false //상태값 초기화 
        };
    }

    // 포트폴리오 키워드 
    if (portfolioKeywords.some(keyword => messageText.toLowerCase().includes(keyword.toLowerCase()))) {
        if (!period) {
            return {
                message: '조회하실 기간을 선택해 주세요: 3개월, 6개월, 1년',
                isWaitingForPeriod: true
            };
        } else {
            const apiResponse = await handlePortfolioApiRequest(period);
            return {
                message: apiResponse.message || JSON.stringify(apiResponse),
                isWaitingForPeriod: false
            };
        }

    }

    //포트폴리오 관련 키워드 아닐때 
    const response = await handleApiRequest(messageText);
    return {message:response, isWaitingForPeriod:false };
};

const handleSubmit = async (e, initialMessage = null) => {
    if (e) e.preventDefault();

    const messageToSend = initialMessage || message;
    if (messageToSend.trim()) {
        setIsLoading(true);
        try {
            const { message: responseMessage, isWaitingForPeriod: waitForPeriod } = 
                await processPortfolioRequest(messageToSend, isWaitingForPeriod);
            
            onSendMessage(messageToSend, responseMessage);
            setIsWaitingForPeriod(waitForPeriod);
            setMessage('');
            if (textareaRef.current) {
                textareaRef.current.style.height = '40px';
            }
        } catch (error) {
            console.error('Error sending message:', error);
            onSendMessage(messageToSend, '죄송합니다. 오류가 발생했습니다.');
            setIsWaitingForPeriod(false);
        } finally {
            setIsLoading(false);
        }
    }
};
// Regenerate 처리
    const handleRegenerate = async () => {
        if (lastUserMessage) {
            setIsLoading(true);
            try {
                // 포트폴리오 요청 처리
                const { message: responseMessage, isWaitingForPeriod: waitForPeriod } = await processPortfolioRequest(lastUserMessage,isWaitingForPeriod);
                
                onSendMessage(lastUserMessage, responseMessage);
                setIsWaitingForPeriod(waitForPeriod);

            } catch (error) {
                console.error('Error regenerating response:', error);
                onSendMessage(lastUserMessage, '죄송합니다. 오류가 발생했습니다.');
                setIsWaitingForPeriod(false);
            } finally {
                setIsLoading(false);
            }
        }
    };

    const periodKeywords =   ['3개월', '6개월', '1년', '3달', '6달', '일년', '3', '6', '12','1'];
    // Helper 함수로 숫자 입력을 기간으로 변환
    const findPeriodKeyword = (message) => {
        // '3', '6', '12' 숫자 문자열을 기간 키워드로 매핑
        if (/3\s*개월?|3\s*달?|3/.test(message)) return '3개월';
        if (/6\s*개월?|6\s*달?|6/.test(message)) return '6개월';
        if (/1\s*년|12\s*개월?|일년/.test(message)) return '1년';

        // 기존 기간 키워드 중에 포함된 값 찾기
        return periodKeywords.find(keyword => 
            message.toLowerCase().includes(keyword.toLowerCase())
        );
    };

    const handlePortfolioApiRequest = async (period) => {
        try {
            let periodValue;
            switch (period) {
                case '3개월':
                case '3달':
                    periodValue = '3m';
                    break;
                case '6개월':
                case '6달':
                    periodValue = '6m';
                    break;
                case '1년':
                case '일년':
                case '1':
                    periodValue = '1y';
                    break;
                default:
                    periodValue = '1y';
            }
    
            console.log(periodValue); // 디버깅용 로그
    
            // // 테스트를 위한 임시 응답
            // return {
            //     message: `${period} 기간의 포트폴리오 데이터를 조회합니다.`
            // };
            const response = await axios.post('http://localhost:8082/api/portfolio', { //portfoliosvc server
                period: periodValue
            });
    
            if (response.status !== 200) {
                throw new Error('Portfolio API request failed');
            }
    
            if (typeof response.data === 'object') {
                return {
                    message: response.data.message || JSON.stringify(response.data)
                };
            }
    
            return {
                message: response.data
            };
            
        } catch (error) {
            console.error('Error:', error);
            throw new Error('Portfolio API request failed');
        }
    };

// 부모 컴포넌트에서 접근할 수 있는 메서드 노출
    useImperativeHandle(ref, () => ({
        handleRegenerate,
        handleSubmit
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
