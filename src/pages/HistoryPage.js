
// pages/HistoryPage.js
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const HistoryPage = () => {
    const navigate = useNavigate();

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
                <h1 className="text-xl font-bold ml-4">History</h1>
            </div>

            {/* 채팅 기록 리스트 */}
            <div className="flex-1 overflow-y-auto p-4">
                {/* 여기에 채팅 기록 컴포넌트들 추가 */}
            </div>
        </div>
    );
};

export default HistoryPage;