// pages/PreferencePage.js
import { History, LogOut, MessageSquarePlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BasicLayout from '../layouts/BasicLayout';

const PreferencePage = () => {
    const navigate = useNavigate();

    const handleHistory = () => {
        navigate('/view/history');
    };

    const handleNewChat = () => {
        navigate('/view/chat'); // 메인 채팅 페이지로 이동
    };

    const handleLogout = () => {
        // 로그아웃 처리 로직
        navigate('/view/login');
    };

    return (
        <BasicLayout title="Preference">
            {/* 메뉴 리스트 */}
            <div className="flex flex-col p-4">
                <button onClick={handleNewChat} className="flex items-center p-4 hover:bg-gray-50 rounded-lg">
                    <MessageSquarePlus className="w-6 h-6 mr-4 text-gray-600" />
                    <div className="flex flex-col items-start">
                        <span className="font-medium">New Chat</span>
                        <span className="text-sm text-gray-500">Start a new conversation</span>
                    </div>
                </button>

                <button onClick={handleHistory} className="flex items-center p-4 hover:bg-gray-50 rounded-lg mt-2">
                    <History className="w-6 h-6 mr-4 text-gray-600" />
                    <div className="flex flex-col items-start">
                        <span className="font-medium">History</span>
                        <span className="text-sm text-gray-500">Show your chat history</span>
                    </div>
                </button>

                <button onClick={handleLogout} className="flex items-center p-4 hover:bg-gray-50 rounded-lg mt-2">
                    <LogOut className="w-6 h-6 mr-4 text-gray-600" />
                    <div className="flex flex-col items-start">
                        <span className="font-medium">Logout</span>
                        <span className="text-sm text-gray-500">Logout</span>
                    </div>
                </button>
            </div>
        </BasicLayout>
    );
};

export default PreferencePage;
