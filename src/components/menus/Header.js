import { ArrowLeft, Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Header = ({ title, subtitle, showMenu = false }) => {
    const navigate = useNavigate();

    return (
        <div className="relative flex items-center justify-center p-4 border-b bg-white">
            {/* 뒤로가기 버튼 */}
            {!showMenu && (
                <button onClick={() => navigate(-1)} className="absolute left-4 p-2 hover:bg-gray-100 rounded-full">
                    <ArrowLeft size={24} />
                </button>
            )}

            {/* 중앙 타이틀 */}
            <div className="text-center">
                <h1 className="text-lg font-bold text-blue-600">{title}</h1>
                {subtitle && <p className="text-sm text-blue-400">{subtitle}</p>}
            </div>

            {/* 메뉴 버튼 */}
            {showMenu && (
                <button
                    onClick={() => navigate('/view/preference')}
                    className="absolute right-4 p-2 hover:bg-gray-100 rounded-full"
                >
                    <Menu size={24} />
                </button>
            )}
        </div>
    );
};

export default Header;
