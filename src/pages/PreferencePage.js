// pages/PreferencePage.js
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, History, LogOut } from 'lucide-react';

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
        <div className="flex flex-col h-screen bg-white">
            {/* 헤더 */}
            <div className="flex items-center p-4 border-b">
                <button
                    onClick={() => navigate(-1)}
                    className="p-2 hover:bg-gray-100 rounded-full"
                >
                    <ArrowLeft size={24} />
                </button>
                <h1 className="text-xl font-bold ml-4">Preference</h1>
            </div>

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
        </div>
    );
};

export default PreferencePage;