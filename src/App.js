import { RouterProvider } from 'react-router-dom';
import './App.css';
import root from './router/root';
import { ChatProvider } from './util/ChatContext';
import { UserProvider } from './util/UserContext';

function App() {
    return (
        <ChatProvider>
            <UserProvider>
                <RouterProvider router={root}></RouterProvider>
            </UserProvider>
        </ChatProvider>
    );
}

export default App;
