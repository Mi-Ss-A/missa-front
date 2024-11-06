// src/layouts/LoginLayout.js
import React from 'react';

const LoginLayout = ({ children }) => {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '26px 21px',
                gap: '180px',
                position: 'relative',
                width: '393px',
                height: '852px',
                background: '#F7F8FA',
                borderRadius: '18px',
            }}
        >
            {children}
        </div>
    );
};

export default LoginLayout;
