import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BasicLayout from '../layouts/BasicLayout';
import { useParams, useNavigate } from 'react-router-dom';
const HistoryPage = () => {
    const [dates, setDates] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleDateClick = (date) => {
        navigate(`/history/${date}`);
    };
    useEffect(() => {
        const fetchHistoryDates = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get('http://localhost:8081/api/history/dates', {
                    withCredentials: true
                });

                // 날짜 데이터를 Today, Yesterday, 기타 날짜로 분류
                const formattedDates = response.data.map(date => ({
                    original: date,
                    display: formatDate(date)
                }));

                setDates(formattedDates);
            } catch (err) {
                setError(err.response?.data?.message || '데이터를 불러오는데 실패했습니다.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchHistoryDates();
    }, []);

    const formatDate = (dateString) => {
        const today = new Date();
        const date = new Date(dateString);

        today.setHours(0, 0, 0, 0);
        date.setHours(0, 0, 0, 0);

        if (date.getTime() === today.getTime()) {
            return 'Today';
        } else if (date.getTime() === today.getTime() - 86400000) {
            return 'Yesterday';
        } else {
            return new Date(dateString).toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        }
    };

    if (isLoading) return (
        <BasicLayout title="History">
            <div className="flex justify-center items-center h-full">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900"></div>
            </div>
        </BasicLayout>
    );

    if (error) return (
        <BasicLayout title="History">
            <div className="flex justify-center items-center h-full text-red-500">
                {error}
            </div>
        </BasicLayout>
    );

    // 날짜를 그룹화 (Today, Yesterday, Others)
    const groupedDates = dates.reduce((acc, date) => {
        const group = date.display === 'Today' ? 'Today' :
            date.display === 'Yesterday' ? 'Yesterday' : 'Others';
        if (!acc[group]) {
            acc[group] = [];
        }
        acc[group].push(date);
        return acc;
    }, {});

    return (
        <BasicLayout>
            <div className="flex-1 p-4">
                {Object.entries(groupedDates).map(([group, groupDates]) => (
                    <div key={group} className="mb-6">
                        <h2 className="text-lg font-semibold mb-3">{group}</h2>
                        <div className="space-y-2">
                            {groupDates.map((date, index) => (
                                <div
                                    key={`${group}-${index}`}
                                    className="w-full p-4 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                                    onClick={() => handleDateClick(date.original)}
                                >
                                    <div className="flex justify-between items-center">
                                        <span>{date.display}</span>
                                        <span className="text-sm text-gray-500">
                                            {group === 'Others' && new Date(date.original).toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </BasicLayout>
    );
};

export default HistoryPage;