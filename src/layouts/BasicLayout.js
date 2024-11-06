// layouts/BasicLayout.js
import Header from "../components/menus/Header";

const BasicLayout = ({ children, title, showMenu = false }) => {
    return (
        <div className="h-screen flex flex-col">
            <Header title={title} showMenu={showMenu} />
            <main className="flex-1 overflow-y-auto">
                {children}
            </main>
        </div>
    );
};

export default BasicLayout;