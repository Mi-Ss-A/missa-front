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

    const botAvatarStyle = {
        backgroundImage: 'url("/view/icon.png")', // 벌 이미지 경로
        backgroundSize: 'cover', // 원형 내부에 맞게 크기 조정
        backgroundPosition: 'center center', // 이미지 중앙 정렬
        backgroundRepeat: 'no-repeat', // 반복 방지
        backgroundColor: '#ffffff', // 흰색 배경 추가
        border: '2px solid #e5e7eb', // 얇은 테두리
        borderRadius: '50%', // 완벽한 원형 유지
        display: 'flex', // 정렬을 위해 flexbox 추가
        alignItems: 'center', // 수직 정렬
        justifyContent: 'center', // 수평 정렬
    };
    const userAvatarStyle = {
        backgroundImage: 'url("/view/user.png")', // 벌 이미지 경로
        backgroundSize: '80%', // 원형 내부에 맞게 크기 조정
        backgroundPosition: 'center center', // 이미지 중앙 정렬
        backgroundRepeat: 'no-repeat', // 반복 방지
        backgroundColor: '#d9dbde', // 흰색 배경 추가
        border: '2px solid #e5e7eb', // 얇은 테두리
        borderRadius: '50%', // 완벽한 원형 유지
        display: 'flex', // 정렬을 위해 flexbox 추가
        alignItems: 'center', // 수직 정렬
        justifyContent: 'center', // 수평 정렬
    };

    const botMessageBackground = 'bg-gray-200 text-gray-900';
    const userMessageBackground = 'bg-blue-500 text-white';

    return (
        <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
            {!isUser && (
                <div className="w-12 h-12 rounded-full flex-shrink-0 mr-3 shadow-lg" style={botAvatarStyle}></div>
            )}
            <div className="max-w-[calc(100%-32px)] flex flex-col">
                <div
                    className={`break-words whitespace-pre-wrap p-4 rounded-2xl ${
                        isUser ? `${userMessageBackground} rounded-br-none` : `${botMessageBackground} rounded-bl-none`
                    }`}
                >
                    {renderContent(text)}
                </div>
            </div>
            {isUser && (
                <div className="w-12 h-12 rounded-full flex-shrink-0 ml-3 shadow-lg" style={userAvatarStyle}></div>
            )}
        </div>
    );
};

export default ChatMessage;
