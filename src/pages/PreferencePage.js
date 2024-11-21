// pages/PreferencePage.js
import { useNavigate } from 'react-router-dom';
import { History, LogOut, MessageSquarePlus } from 'lucide-react';
import BasicLayout from '../layouts/BasicLayout';
import { useState } from 'react';
import axios from 'axios';

const PreferencePage = () => {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleHistory = () => {
        navigate('/history');
    };

    const handleNewChat = () => {
        navigate('/chat'); // 메인 채팅 페이지로 이동
    };

    const handleLogout = async () => {
        setLoading(true); // 로딩 시작
        setError(null); // 기존 오류 초기화
        try {
            console.log('handleLogout Clicked');
            const response = await axios.post(
                'http://localhost:8081/api/users/logout',
                {}, // 서버는 별도의 데이터 필요 없음
                { withCredentials: true }
            );

            if (response.data.success) {
                navigate('/login'); // 성공적으로 로그아웃 시 로그인 페이지로 이동
            } else {
                setError(response.data.message || 'Logout failed.');
            }
        } catch (error) {
            setError('Server error occurred.');
        } finally {
            setLoading(false); // 로딩 종료
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

                <button
                    onClick={handleLogout}
                    className="flex items-center p-4 hover:bg-gray-50 rounded-lg mt-2"
                    disabled={loading} // 로딩 중 버튼 비활성화
                >
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
