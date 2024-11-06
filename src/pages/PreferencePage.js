// pages/PreferencePage.js
import { useNavigate } from 'react-router-dom';
import { History, LogOut } from 'lucide-react';
import BasicLayout from '../layouts/BasicLayout';

const PreferencePage = () => {
    const navigate = useNavigate();

    const handleHistory = () => {
        navigate('/history');
    };

    const handleLogout = () => {
        // 로그아웃 처리 로직
        navigate('/login');
    };

    return (
        <BasicLayout title="Preference">
            {/* 메뉴 리스트 */}
            <div className="flex flex-col p-4">
                <button
                    onClick={handleHistory}
                    className="flex items-center p-4 hover:bg-gray-50 rounded-lg"
                >
                    <History className="w-6 h-6 mr-4 text-gray-600" />
                    <div className="flex flex-col items-start">
                        <span className="font-medium">History</span>
                        <span className="text-sm text-gray-500">Show your chat history</span>
                    </div>
                </button>

                <button
                    onClick={handleLogout}
                    className="flex items-center p-4 hover:bg-gray-50 rounded-lg mt-2"
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