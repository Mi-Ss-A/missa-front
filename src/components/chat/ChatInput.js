// components/chat/ChatInput.js
import axios from 'axios';
import { ArrowUpIcon } from 'lucide-react';
import { forwardRef, useCallback, useImperativeHandle, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 리다이렉트에 필요
import { useUser } from '../../util/UserContext';
import LoadingSpinner from '../ui/LoadingSpinner';

const portfolioKeywords = ['portfolio', '포트 폴리오', '포트폴리오', 'portpolio', '포폴', 'vhvhf', 'vhxmvhffldh'];
const periodKeywords = ['3개월', '6개월', '1년', '3달', '6달', '일년', '3', '6', '12', '1'];

const ChatInput = forwardRef(({ message, setMessage, onSendMessage, lastUserMessage }, ref) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isWaitingForPeriod, setIsWaitingForPeriod] = useState(false);
    const textareaRef = useRef(null);
    const { isPortfolioAllowed } = useUser(); // 상태 확인 함수 가져오기
    const navigate = useNavigate(); // 네비게이트 훅 추가

    const handleApiRequest = useCallback(
        async (url, payload) => {
            try {
                // 세션 확인 요청
                const sessionResponse = await axios.get('http://localhost:8081/api/users/check-session', {
                    withCredentials: true, // 쿠키 포함
                });

                const redisSessionId = sessionResponse.data.redisSessionId;

                // 세션 만료 처리
                if (!redisSessionId) {
                    alert('세션이 만료되었습니다. 로그인 페이지로 이동합니다.');
                    setIsLoading(false); // 로딩 상태 업데이트
                    navigate('/view/login'); // 로그인 페이지로 이동
                    return;
                }
                const updatedPayload = { ...payload, sessionId: redisSessionId };

                console.log('check-session을 통한 redisSessionId 값:', redisSessionId);

                // API 요청
                const response = await axios.post(url, updatedPayload, {
                    withCredentials: true,
                });

                if (response.status === 200) {
                    return response.data;
                }

                throw new Error('API 요청 실패');
            } catch (error) {
                console.error('API 요청 중 오류:', error);
                throw error;
            }
        },
        [navigate]
    );

    const findPeriodKeyword = useCallback((message) => {
        if (/3\s*개월?|3\s*달?|3/.test(message)) return '3m';
        if (/6\s*개월?|6\s*달?|6/.test(message)) return '6m';
        if (/1\s*년|12\s*개월?|일년/.test(message)) return '1y';
        return periodKeywords.find((keyword) => message.toLowerCase().includes(keyword.toLowerCase()));
    }, []);

    const processPortfolioRequest = useCallback(
        async (messageText, isWaiting = false) => {
            if (!isPortfolioAllowed()) {
                return { message: '포트폴리오는 구독자 전용입니다.', isWaitingForPeriod: false };
            }
            // 이미 로딩 상태일 경우 중복 요청 차단
            if (isLoading) {
                return { message: '현재 요청을 처리 중입니다. 잠시만 기다려주세요.', isWaitingForPeriod };
            }

            try {
                // 기간 키워드 확인
                const period = findPeriodKeyword(messageText);

                if (isWaiting) {
                    // 대기 중이고 기간이 입력되었을 때만 API 호출
                    if (period) {
                        const response = await handleApiRequest('http://localhost:5000/api/agent/portfolio', {
                            period,
                        });
                        return {
                            message: response.message || '포트폴리오 요청 결과',
                            portfolioUrls: response.portfolioUrls || [],
                            isWaitingForPeriod: false,
                        };
                    }
                    // 기간이 없는 경우 대기 유지
                    return { message: '기간을 입력해주세요: 3개월, 6개월, 1년', isWaitingForPeriod: true };
                }

                // 포트폴리오 요청 키워드 확인
                if (portfolioKeywords.some((keyword) => messageText.toLowerCase().includes(keyword.toLowerCase()))) {
                    if (!period) {
                        // 기간 선택 요청 메시지 반환 및 대기 상태 설정
                        return {
                            message: '조회하실 기간을 선택해 주세요: 3개월, 6개월, 1년',
                            isWaitingForPeriod: true,
                        };
                    }
                    // 기간이 있으면 포트폴리오 API 요청
                    const response = await handleApiRequest('http://localhost:5000/api/agent/portfolio', {
                        period,
                    });
                    return {
                        message: response.message || '포트폴리오 요청 결과',
                        portfolioUrls: response.portfolioUrls || [],
                        isWaitingForPeriod: false,
                    };
                }

                // 기본 메시지 처리
                const response = await handleApiRequest('http://localhost:5000/api/agent/chat', {
                    message: messageText,
                });
                return { message: response.response, isWaitingForPeriod: false };
            } catch (error) {
                console.error('API 요청 중 오류:', error);
                return { message: '죄송합니다. 오류가 발생했습니다.', isWaitingForPeriod: false };
            }
        },
        [findPeriodKeyword, handleApiRequest, isLoading, isPortfolioAllowed, isWaitingForPeriod]
    );

    const handleSubmit = async (e, initialMessage = null) => {
        e?.preventDefault();
        if (isLoading) return;

        const messageToSend = initialMessage || message;
        if (!messageToSend.trim()) return;

        // 중복 메시지 방지
        if (lastUserMessage === messageToSend && !isWaitingForPeriod) return;

        setIsLoading(true);
        try {
            // 요청 처리
            const {
                message: responseMessage,
                portfolioUrls,
                isWaitingForPeriod: waitForPeriod,
            } = await processPortfolioRequest(messageToSend, isWaitingForPeriod);

            // 메시지 전송
            onSendMessage(messageToSend, responseMessage, portfolioUrls); // portfolioUrls를 추가로 전달
            setIsWaitingForPeriod(waitForPeriod);
        } catch (error) {
            console.error('API 요청 중 오류:', error);
            onSendMessage(messageToSend, '죄송합니다. 오류가 발생했습니다.');
            setIsWaitingForPeriod(false);
        } finally {
            // 입력창 초기화
            setMessage('');
            if (textareaRef.current) {
                textareaRef.current.style.height = '40px';
            }
            setIsLoading(false);
        }
    };

    const handleRegenerate = async () => {
        if (!lastUserMessage) return;

        setIsLoading(true);
        try {
            const response = await processPortfolioRequest(lastUserMessage);
            onSendMessage(lastUserMessage, response.message);
        } catch (error) {
            console.error('Regenerate 요청 중 오류:', error);
            onSendMessage(lastUserMessage, '죄송합니다. 다시 시도해주세요.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleTextAreaChange = (e) => {
        setMessage(e.target.value);
        e.target.style.height = '40px';
        e.target.style.height = `${e.target.scrollHeight}px`;
    };

    useImperativeHandle(ref, () => ({
        handleSubmit,
        handleRegenerate,
    }));

    return (
        <div className="p-4 bg-blue-50 border-t">
            {isLoading ? (
                <LoadingSpinner text="잠시만 기다려주세요..." />
            ) : (
                <form onSubmit={handleSubmit} className="flex items-center gap-2">
                    <div className="relative flex-1">
                        <textarea
                            ref={textareaRef}
                            value={message}
                            onChange={handleTextAreaChange}
                            placeholder="메시지를 입력하세요..."
                            className="w-full p-3 pr-12 border rounded-lg focus:outline-none focus:border-blue-400 resize-none min-h-[40px] max-h-[200px]"
                            style={{ overflow: 'hidden', height: '40px' }}
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
                            <ArrowUpIcon size={20} />
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
});

ChatInput.displayName = 'ChatInput';

export default ChatInput;
