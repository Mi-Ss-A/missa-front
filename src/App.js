import { RouterProvider } from 'react-router-dom';
import './App.css';
import root from './router/root';
import { ChatProvider } from './util/ChatContext';

function App() {
    return (
        <ChatProvider>
            <RouterProvider router={root}></RouterProvider>
        </ChatProvider>
    );
}

export default App;
