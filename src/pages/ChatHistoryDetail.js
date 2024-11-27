import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ChatMessage from '../components/chat/ChatMessage';
import BasicLayout from '../layouts/BasicLayout';

const ChatHistoryDetail = () => {
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const { date } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                setIsLoading(true);
                // develop //
                // const response = await axios.get(`http://localhost:8081/api/history`, {
                // deploy //
                const response = await axios.get(`/api/history`, {
                    params: { date },
                    withCredentials: true,
                });
                setMessages(response.data);
            } catch (err) {
                setError(err.response?.data?.message || '메시지를 불러오는데 실패했습니다.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchMessages();
    }, [date]);

    if (isLoading) {
        return (
            <BasicLayout>
                <div className="flex justify-center items-center h-full">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900"></div>
                </div>
            </BasicLayout>
        );
    }

    if (error) {
        return (
            <BasicLayout>
                <div className="flex justify-center items-center h-full text-red-500">{error}</div>
            </BasicLayout>
        );
    }

    return (
        <BasicLayout showMenu={true}>
            <div className="flex flex-col h-screen bg-blue-50">
                {/* 로고 섹션 */}
                <div className="flex justify-between items-center my-4 md:my-8 px-4">
                    <button onClick={() => navigate('/history')} className="text-blue-600 hover:text-blue-800"></button>
                    <div className="text-center">
                        <h1 className="text-lg md:text-xl font-bold text-blue-600">WIBEE CHAT</h1>
                        <p className="text-xs md:text-sm text-blue-400">CHAT HISTORY</p>
                    </div>
                    <div className="w-10"></div> {/* 균형을 맞추기 위한 빈 공간 */}
                </div>

                {/* 메시지 목록 섹션 */}
                <div className="flex-1 px-2 md:px-4 overflow-y-auto mb-4">
                    <div className="space-y-2 mb-4">
                        {messages.map((message, index) => (
                            <ChatMessage
                                key={index}
                                text={message.message.content}
                                isUser={message.message.sender === 'USER'}
                                timestamp={message.message.timestamp}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </BasicLayout>
    );
};

export default ChatHistoryDetail;
