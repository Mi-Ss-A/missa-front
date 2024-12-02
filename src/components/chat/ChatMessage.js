import ReactMarkdown from 'react-markdown';

const ChatMessage = ({ text, isUser, isLink }) => {

    // URL 감지 함수
    const isUrl = (str) => {
        try {
            const url = new URL(str); // 유효한 URL인지 검증
            return url.protocol === 'http:' || url.protocol === 'https:';
        } catch {
            return false;
        }
    };

    const renderContent = (content) => {
        if (isUrl(content.trim())) {
          return (
            <a
              href={content.trim()}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline hover:text-blue-700 cursor-pointer"
            >
              {/* {content.trim()} */}
              포트폴리오 바로가기
            </a>
          );
        }
        return <ReactMarkdown>{content}</ReactMarkdown>;
      };
    

    const botMessageBackground = 'bg-gray-200 text-gray-900';
    const userMessageBackground = 'bg-blue-500 text-white';

    return (
        <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
            {!isUser && <div className="w-8 h-8 rounded-full bg-blue-500 flex-shrink-0 mr-2"></div>}
            <div className="max-w-[calc(100%-32px)] flex flex-col">
                <div
                    className={`break-words whitespace-pre-wrap p-4 rounded-2xl ${
                        isUser
                            ? `${userMessageBackground} rounded-br-none`
                            : `${botMessageBackground} rounded-bl-none`
                    }`}
                >
                    {renderContent(text)}
                </div>
            </div>
            {isUser && <div className="w-8 h-8 rounded-full bg-gray-300 flex-shrink-0 ml-2"></div>}
        </div>
    );
};

export default ChatMessage;
