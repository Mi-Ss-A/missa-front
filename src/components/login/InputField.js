import React from 'react';

const InputField = ({ type, placeholder, value, onChange }) => {
    return (
        <div className="relative">
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="w-full py-3 pl-4 pr-4 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                required
            />
        </div>
    );
};

export default InputField;
