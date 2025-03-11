import React from 'react';

const Input = ({ label, name, type, value,placeholder, onChange, className }) => {
    return (
        <div>
            <label className="block text-gray-700 mb-2">{label}</label>
            <input
                type={type}
                name={name}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                className={`px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
            />
        </div>
    );
};

export default Input;
