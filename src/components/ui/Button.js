// components/ui/Button.js
const Button = ({ children, onClick, className }) => (
    <button
        onClick={onClick}
        className={`px-4 py-2 rounded-lg shadow-sm bg-blue-500 text-white hover:bg-blue-600 transition ${className}`}
    >
        {children}
    </button>
);

export default Button;
