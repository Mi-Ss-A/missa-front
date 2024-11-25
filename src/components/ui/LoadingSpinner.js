// components/ui/LoadingSpinner.js
const LoadingSpinner = ({ text = 'Loading...' }) => (
    <div className="flex flex-col items-center justify-center gap-2">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-sm text-gray-600">{text}</p>
    </div>
);

export default LoadingSpinner;
