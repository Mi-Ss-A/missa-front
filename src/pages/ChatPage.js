// pages/MainPage.js
import { useState } from 'react';
import BasicLayout from '../layouts/BasicLayout';
import { ArrowRight } from 'lucide-react';

const ChatPage = () => {
    const [message, setMessage] = useState('');

    const handleSendMessage = (e) => {
        e.preventDefault();
        // 메시지 전송 로직
        setMessage('');
    };

    return (
        <BasicLayout>
            <div className="flex flex-col h-screen bg-blue-50">
                {/* 로고 섹션 */}
                <div className="flex justify-center my-8">
                    {/*<img*/}
                    {/*    alt="WIBEE CHAT"*/}
                    {/*    className="w-24 h-24"*/}
                    {/*/>*/}
                    <div className="text-center mt-2">
                        <h1 className="text-xl font-bold text-blue-600">WIBEE CHAT</h1>
                        <p className="text-sm text-blue-400">FINANCIAL BUTLER</p>
                    </div>
                </div>

                {/* 메시지 목록 섹션 */}
                <div className="flex-1 px-4 space-y-4 overflow-y-auto">
                    <button className="w-full p-4 text-left bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                        내 거래내역 사칭 확인 (유료)
                    </button>
                    <button className="w-full p-4 text-left bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                        어떠한 용도 카드 제공확인
                    </button>
                    <button className="w-full p-4 text-left bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                        공격적인 투자 상품로 추천해줘
                    </button>
                </div>

                {/* 메시지 입력 섹션 */}
                <div className="p-4 bg-white border-t">
                    <form onSubmit={handleSendMessage} className="flex items-center">
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Send a message"
                            className="flex-1 p-2 border rounded-l-lg focus:outline-none focus:border-blue-400"
                        />
                        <button
                            type="submit"
                            className="p-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600"
                        >
                            <ArrowRight size={20} />
                        </button>
                    </form>
                </div>
            </div>
        </BasicLayout>
    );
};

export default ChatPage;