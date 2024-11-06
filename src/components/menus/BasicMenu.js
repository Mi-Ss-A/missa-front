import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Menu } from "lucide-react"; // lucide-react 아이콘 사용

const BasicMenu = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1); // 이전 페이지로 이동
    };

    return (
        <nav className="w-full px-4 py-3 flex justify-between items-center bg-white">
            {/* 왼쪽 뒤로가기 버튼 */}
            <button
                onClick={handleGoBack}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
                <ArrowLeft size={24} />
            </button>

            {/* 중앙 로고 또는 타이틀 (선택사항) */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2">
                <h1 className="text-xl font-bold">WIBEE CHAT</h1>
            </div>

            {/* 오른쪽 메뉴 */}
            <div className="relative group">
                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <Menu size={24} />
                </button>

                {/* 드롭다운 메뉴 */}
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <ul className="py-2">
                        <li>
                            <Link to="/" className="block px-4 py-2 hover:bg-gray-100 text-gray-700">
                                홈
                            </Link>
                        </li>
                        <li>
                            <Link to="/chat" className="block px-4 py-2 hover:bg-gray-100 text-gray-700">
                                채팅
                            </Link>
                        </li>
                        <li>
                            <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100 text-gray-700">
                                프로필
                            </Link>
                        </li>
                        <li>
                            <Link to="/settings" className="block px-4 py-2 hover:bg-gray-100 text-gray-700">
                                설정
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default BasicMenu;