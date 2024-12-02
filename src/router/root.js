import { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';

const Loading = <div>Loading....</div>;
const Chat = lazy(() => import('../pages/ChatPage'));
const Preference = lazy(() => import('../pages/PreferencePage'));
const History = lazy(() => import('../pages/HistoryPage'));
const Login = lazy(() => import('../pages/LoginPage'));
const Onboarding = lazy(() => import('../pages/OnBoardingPage'));
const Splash = lazy(() => import('../pages/SplashPage'));
const ChatHistoryDetail = lazy(() => import('../pages/ChatHistoryDetail'));
const Portfolio = lazy(() => import('../pages/PortfolioPage'));

// 모든 경로는 "/view"를 기준으로 설정됨
const root = createBrowserRouter([
    {
        path: '/',
        element: <Navigate to="/view" replace />, // 기본 경로를 "/view"로 리다이렉트
    },
    {
        path: '/view',
        children: [
            {
                path: '', // "/view" -> Splash 화면
                element: (
                    <Suspense fallback={Loading}>
                        <Splash />
                    </Suspense>
                ),
            },
            {
                path: 'chat', // "/view/chat"
                element: (
                    <Suspense fallback={Loading}>
                        <Chat />
                    </Suspense>
                ),
            },
            {
                path: 'preference', // "/view/preference"
                element: (
                    <Suspense fallback={Loading}>
                        <Preference />
                    </Suspense>
                ),
            },
            {
                path: 'history', // "/view/history"
                element: (
                    <Suspense fallback={Loading}>
                        <History />
                    </Suspense>
                ),
            },
            {
                path: 'login', // "/view/login"
                element: (
                    <Suspense fallback={Loading}>
                        <Login />
                    </Suspense>
                ),
            },
            {
                path: 'onboarding', // "/view/onboarding"
                element: (
                    <Suspense fallback={Loading}>
                        <Onboarding />
                    </Suspense>
                ),
            },
            {
                path: 'history/:date', // "/view/history/:date"
                element: (
                    <Suspense fallback={Loading}>
                        <ChatHistoryDetail />
                    </Suspense>
                ),
            },
            {
                path: 'portfolios',
                element: (
                    <Suspense fallback={Loading}>
                        <Portfolio />
                    </Suspense>
                ),
            },
        ],
    },
]);

export default root;
