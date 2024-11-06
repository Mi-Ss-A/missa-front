// layouts/BasicLayout.js
import BasicMenu from '../components/menus/BasicMenu';

const BasicLayout = ({ children }) => {
    return (
        <div className="h-screen flex flex-col">
            <BasicMenu />
            <main className="flex-1 overflow-y-auto">
                {children}
            </main>
        </div>
    );
};

export default BasicLayout;