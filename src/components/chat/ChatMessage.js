import ReactMarkdown from 'react-markdown';

const ChatMessage = ({ text, isUser }) => {
    // URL인지 확인하는 정규식
    const isUrl = (str) => {
        const urlPattern = new RegExp(
            '^(https?:\\/\\/)?' + // protocol
            '((([a-zA-Z\\d]([a-zA-Z\\d-]*[a-zA-Z\\d])*)\\.)+[a-zA-Z]{2,}|' + // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-zA-Z\\d%_.~+]*)*' + // port and path
            '(\\?[;&a-zA-Z\\d%_.~+=-]*)?' + // query string
            '(\\#[-a-zA-Z\\d_]*)?$', // fragment locator
            'i'
        );
        return !!urlPattern.test(str);
    };

    // URL 렌더링을 지원하는 마크다운 렌더러
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

        // 기본 ReactMarkdown 처리
        return <ReactMarkdown>{content}</ReactMarkdown>;
    };

    return (
        <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
            {/* 봇 프로필 아이콘 */}
            {!isUser && (
                <div className="w-8 h-8 rounded-full bg-blue-500 flex-shrink-0 mr-2">
                    {/* 봇 아이콘 */}
                </div>
            )}

            {/* 메시지 내용 */}
            <div className="max-w-[75%] flex flex-col">
                <div
                    className={`break-words whitespace-pre-wrap p-4 rounded-2xl ${
                        isUser
                            ? 'bg-blue-500 text-white rounded-br-none'
                            : 'bg-white text-gray-800 rounded-bl-none'
                    }`}
                    style={{
                        wordBreak: 'break-word', // 긴 단어도 강제로 줄바꿈
                        overflowWrap: 'break-word', // 필요한 경우 단어 중간에서도 줄바꿈
                    }}
                >
                    {renderMarkdown(text)}
                </div>
            </div>

            {/* 사용자 프로필 아이콘 */}
            {isUser && (
                <div className="w-8 h-8 rounded-full bg-gray-300 flex-shrink-0 ml-2">
                    {/* 사용자 아이콘 */}
                </div>
            )}
        </div>
    );
};

export default ChatMessage;
