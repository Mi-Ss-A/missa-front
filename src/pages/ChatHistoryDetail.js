import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ChatMessage from '../components/chat/ChatMessage';
import BasicLayout from '../layouts/BasicLayout';

const ChatHistoryDetail = () => {
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const { date } = useParams();

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
            <BasicLayout title="History">
                <div className="flex justify-center items-center h-full">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900"></div>
                </div>
            </BasicLayout>
        );
    }

    if (error) {
        return (
            <BasicLayout title="History">
                <div className="flex justify-center items-center h-full text-red-500">{error}</div>
            </BasicLayout>
        );
    }

    return (
        <BasicLayout title="History">
            <div className="flex justify-center bg-blue-50 h-full">
                <div className="max-w-screen-lg w-full px-4 flex flex-col h-full">
                    {/* 메시지 목록 */}
                    <div className="flex-1 px-2 md:px-4 overflow-y-auto pb-20 pt-8 scrollbar-hide">
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
            </div>
        </BasicLayout>
    );
};

export default ChatHistoryDetail;
