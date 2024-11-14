import { Suspense, lazy } from 'react';

const { createBrowserRouter } = require('react-router-dom');
const Loading = <div>Loading....</div>;
const Main = lazy(() => import('../pages/MainPage'));
const Chat = lazy(() => import('../pages/ChatPage'));
const Preference = lazy(() => import('../pages/PreferencePage'));
const History = lazy(() => import('../pages/HistoryPage'));
const Login = lazy(() => import('../pages/LoginPage'));
const Onboarding = lazy(() => import('../pages/OnBoardingPage'));
const Splash = lazy(() => import('../pages/SplashPage'));
const ChatHistoryDetail = lazy(() => import('../pages/ChatHistoryDetail'));

const root = createBrowserRouter([
    {
        path: '',
        element: (
            <Suspense fallback={Loading}>
                <Splash />
            </Suspense>
        ),
    },
    {
        path: 'chat',
        element: (
            <Suspense fallback={Loading}>
                <Chat />
            </Suspense>
        ),
    },
    {
        path: 'preference',
        element: (
            <Suspense fallback={Loading}>
                <Preference />
            </Suspense>
        ),
    },
    {
        path: 'history',
        element: (
            <Suspense fallback={Loading}>
                <History />
            </Suspense>
        ),
    },
    {
        path: 'login',
        element: (
            <Suspense fallback={Loading}>
                <Login />
            </Suspense>
        ),
    },
    {
        path: 'onboarding',
        element: (
            <Suspense fallback={Loading}>
                <Onboarding />
            </Suspense>
        ),
    },
    {
        path: 'history/:date', // 히스토리 상세 페이지 라우트 추가
        element: (
            <Suspense fallback={Loading}>
                <ChatHistoryDetail />
            </Suspense>
        ),
    },
    {
        path: '',
        element: (
            <Suspense fallback={Loading}>
                <Splash />
            </Suspense>
        ),
    },
],
{
    basename: "/"
    }
);

export default root;
