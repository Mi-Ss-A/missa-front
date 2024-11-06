import React from 'react';
import './InputField.css';

const InputField = ({ type, placeholder }) => {
    return (
        <div className="input-field">
            <input type={type} className="input" placeholder={placeholder} />
        </div>
    );
};

export default InputField;
