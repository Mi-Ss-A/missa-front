// pages/PreferencePage.js
import axios from 'axios';
import { History, List, LogOut, MessageSquarePlus } from 'lucide-react';
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

    const hadlePortfolios = () => {
        navigate('/view/portfolios');
    };

    const handleLogout = async () => {
        try {
            const response = await axios.post('/api/users/logout', {}, { withCredentials: true }); // deploy
            // const response = await axios.post('http://localhost:8081/api/users/logout', {}, { withCredentials: true }); // develop
            if (response.status === 200) {
                navigate('/view/login');
            }
        } catch (error) {
            console.error('Logout failed:', error.response?.data?.message || error.message);
            alert('Logout failed: ' + (error.response?.data?.message || 'Unknown error'));
        }
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

                <button onClick={hadlePortfolios} className="flex items-center p-4 hover:bg-gray-50 rounded-lg mt-2">
                    <List className="w-6 h-6 mr-4 text-gray-600" />
                    <div className="flex flex-col items-start">
                        <span className="font-medium">Portfolios</span>
                        <span className="text-sm text-gray-500">Get your portfolio lists</span>
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
