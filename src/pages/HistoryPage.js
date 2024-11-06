
// pages/HistoryPage.js
import BasicLayout from '../layouts/BasicLayout';

const HistoryPage = () => {
    // 더미 데이터
    const history = {
        today: [
            "How Much Pushaps A day",
            "Top 10 Imdb Best Movies ever",
            "Tell me what support i played daily fitness"
        ],
        yesterday: [
            "How Much Pushaps A day",
            "Top 10 Imdb Best Movies ever",
            "How are you, friend? long time...",
            "Tell me what support i played daily fitness"
        ]
    };

    return (
        <BasicLayout title="History">
            <div className="flex-1 p-4">
                {/* Today Section */}
                <div className="mb-6">
                    <h2 className="text-lg font-semibold mb-3">Today</h2>
                    <div className="space-y-2">
                        {history.today.map((item, index) => (
                            <button
                                key={`today-${index}`}
                                className="w-full p-4 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                {item}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Yesterday Section */}
                <div>
                    <h2 className="text-lg font-semibold mb-3">Yesterday</h2>
                    <div className="space-y-2">
                        {history.yesterday.map((item, index) => (
                            <button
                                key={`yesterday-${index}`}
                                className="w-full p-4 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                {item}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </BasicLayout>
    );
};

export default HistoryPage;