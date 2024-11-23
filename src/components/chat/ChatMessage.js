import ReactMarkdown from 'react-markdown';

const ChatMessage = ({ text, isUser }) => {
    return (
        <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
            {/* 봇 프로필 아이콘 */}
            {!isUser && <div className="w-8 h-8 rounded-full bg-blue-500 flex-shrink-0 mr-2">{/* 봇 아이콘 */}</div>}

            {/* 메시지 내용 */}
            <div className="max-w-[75%] flex flex-col">
                <div
                    className={`break-words whitespace-pre-wrap p-4 rounded-2xl ${
                        isUser ? 'bg-blue-500 text-white rounded-br-none' : 'bg-white text-gray-800 rounded-bl-none'
                    }`}
                    style={{
                        wordBreak: 'break-word', // 긴 단어도 강제로 줄바꿈
                        overflowWrap: 'break-word', // 필요한 경우 단어 중간에서도 줄바꿈
                    }}
                >
                    {/* 마크다운 렌더링 */}
                    <ReactMarkdown>{text}</ReactMarkdown>
                </div>
            </div>

            {/* 사용자 프로필 아이콘 */}
            {isUser && <div className="w-8 h-8 rounded-full bg-gray-300 flex-shrink-0 ml-2">{/* 사용자 아이콘 */}</div>}
        </div>
    );
};

export default ChatMessage;
