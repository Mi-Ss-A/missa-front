const RegenerateButton = ({ onRegenerate }) => {
    const handleClick = () => {
        console.log('Regenerate button clicked!');
        onRegenerate();
    };

    return (
        <div className="flex justify-center my-4">
            <button
                onClick={handleClick}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 bg-white rounded-lg border hover:bg-gray-50 transition-colors"
                aria-label="Regenerate Response"
            >
                <svg width="16" height="16" viewBox="0 0 16 16" className="rotate-90" aria-hidden="true">
                    <path fill="currentColor" d="M8 3a5 5 0 0 0-5 5v1h1.5V8a3.5 3.5 0 1 1 7 0v1H13V8a5 5 0 0 0-5-5z" />
                </svg>
                Regenerate Response
            </button>
        </div>
    );
};

export default RegenerateButton;
