// components/chat/ChatMessage.js
import ReactMarkdown from 'react-markdown';

const ChatMessage = ({ text, isUser }) => {
    const isUrl = (str) => {
        const urlPattern = new RegExp('^(https?:\\/\\/)?...$', 'i');
        return !!urlPattern.test(str);
    };

    const renderMarkdown = (content) => {
        if (isUrl(content.trim())) {
            return (
                <a
                    href={content.trim()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline hover:text-blue-700"
                >
                    {content.trim()}
                </a>
            );
        }
        return <ReactMarkdown>{content}</ReactMarkdown>;
    };

    const botMessageBackground = 'bg-gray-200';
    const userMessageBackground = 'bg-blue-500';

    return (
        <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
            {!isUser && <div className="w-8 h-8 rounded-full bg-blue-500 flex-shrink-0 mr-2"></div>}
            <div className="max-w-[calc(100%-32px)] flex flex-col">
                <div
                    className={`break-words whitespace-pre-wrap p-4 rounded-2xl ${
                        isUser
                            ? `${userMessageBackground} text-white rounded-br-none`
                            : `${botMessageBackground} text-gray-1000 rounded-bl-none`
                    }`}
                >
                    {renderMarkdown(text)}
                </div>
            </div>
            {isUser && <div className="w-8 h-8 rounded-full bg-gray-300 flex-shrink-0 ml-2"></div>}
        </div>
    );
};

export default ChatMessage;
