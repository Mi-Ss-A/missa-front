// components/menus/BasicMenu.js
import { Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BasicMenu = () => {
    const navigate = useNavigate();

    return (
        <nav className="flex items-center justify-between p-4 border-b bg-white">
            <div>WIBEE CHAT</div>
            <button onClick={() => navigate('/view/preference')} className="p-2 hover:bg-gray-100 rounded-full">
                <Menu size={24} />
            </button>
        </nav>
    );
};

export default BasicMenu;
