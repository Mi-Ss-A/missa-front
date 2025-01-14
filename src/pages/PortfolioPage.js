// pages/PortfolioPage.js
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import BasicLayout from '../layouts/BasicLayout';
import { useNavigate } from 'react-router-dom'; // 리다이렉트에 필요

const PortfolioPage = () => {
    const [portfolioUrls, setPortfolioUrls] = useState([]); // 현재 데이터
    const [loading, setLoading] = useState(true); // 로딩 상태
    const [error, setError] = useState(null); // 에러 상태
    const navigate = useNavigate(); // 네비게이트 훅 추가

    useEffect(() => {
        const fetchPortfolios = async () => {
            setLoading(true); // 로딩 상태 초기화
            try {
                // 1. 캐시된 데이터 확인
                const cachedData = localStorage.getItem('portfolioUrls');
                if (cachedData) {
                    setPortfolioUrls(JSON.parse(cachedData));
                }

                // 2. API 호출 (백그라운드에서 새 데이터 가져오기)
                const sessionResponse = await axios.get('http://localhost:8081/api/users/check-session', {
                    withCredentials: true,
                });
                const redisSessionId = sessionResponse.data.redisSessionId;

                // 세션 만료 처리
                if (!redisSessionId) {
                    alert('세션이 만료되었습니다. 로그인 페이지로 이동합니다.');
                    setLoading(false); // 로딩 상태 업데이트
                    navigate('/view/login'); // 로그인 페이지로 이동
                    return;
                }

                const response = await axios.post('http://localhost:8082/api/portfolio/list', { redisSessionId });

                if (response.status === 200 && response.data.portfolioUrls) {
                    setPortfolioUrls(response.data.portfolioUrls); // 새 데이터 설정
                    localStorage.setItem('portfolioUrls', JSON.stringify(response.data.portfolioUrls)); // 캐시 업데이트
                } else {
                    throw new Error('Failed to fetch portfolio URLs');
                }
            } catch (err) {
                setError(err.message || 'Unknown error occurred');
            } finally {
                setLoading(false); // 로딩 상태 업데이트
            }
        };

        fetchPortfolios();
    }, [navigate]);

    if (loading) {
        return <BasicLayout title="Portfolio Lists">Loading...</BasicLayout>;
    }

    if (error) {
        return <BasicLayout title="Portfolio Lists">Error: {error}</BasicLayout>;
    }

    const extractFileName = (url) => {
        try {
            const path = new URL(url).pathname; // URL 경로 추출
            return path.substring(path.lastIndexOf('/') + 1); // 마지막 슬래시 이후의 문자열 반환
        } catch (error) {
            console.error('Failed to extract file name:', error);
            return 'Unknown File';
        }
    };

    return (
        <BasicLayout title="Portfolio Lists">
            <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {portfolioUrls.map((url, index) => (
                        <div key={index} className="border rounded-lg p-4 shadow">
                            {/* PDF Preview (Embedded viewer for modern browsers) */}
                            <iframe
                                src={url}
                                title={`Portfolio Preview ${index + 1}`}
                                className="w-full h-48 mb-4"
                                allow="fullscreen"
                            ></iframe>
                            <p className="text-gray-500 text-sm mb-2">{extractFileName(url)}</p>
                            {/* Action Buttons */}
                            <div className="flex justify-between items-center">
                                <a
                                    href={url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    download={`Portfolio-${index + 1}.pdf`}
                                    className="text-blue-600 font-medium hover:underline"
                                >
                                    Download
                                </a>
                                <button
                                    onClick={() => window.open(url, '_blank')}
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                >
                                    Open in New Tab
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </BasicLayout>
    );
};

export default PortfolioPage;
