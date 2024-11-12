// src/components/login/InputField.js
import React from 'react';

const InputField = ({ type, placeholder, value, onChange }) => {
    return (
        <div className="w-full mb-4">
            <input
                type={type}
                placeholder={placeholder}
                value={value} // value prop 추가
                onChange={onChange} // onChange prop 추가
                className="w-full p-4 border border-gray-300 rounded-lg text-lg sm:text-xl md:text-2xl"
                required
            />
        </div>
    );
};

export default InputField;