// components/common/Header.js
import { ArrowLeft, Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Header = ({ title, showMenu = false }) => {
    const navigate = useNavigate();

    return (
        <div className="flex items-center justify-between p-4 border-b bg-white">
            <div className="flex items-center">
                {/* 뒤로가기 버튼이 필요한 경우 */}
                {!showMenu && (
                    <button
                        onClick={() => navigate(-1)}
                        className="p-2 hover:bg-gray-100 rounded-full"
                    >
                        <ArrowLeft size={24} />
                    </button>
                )}
                <h1 className={`text-xl font-bold ${!showMenu ? 'ml-4' : ''}`}>{title}</h1>
            </div>
            {/* 메뉴 버튼이 필요한 경우 */}
            {showMenu && (
                <button
                    onClick={() => navigate('/preference')}
                    className="p-2 hover:bg-gray-100 rounded-full"
                >
                    <Menu size={24} />
                </button>
            )}
        </div>
    );
};

export default Header;