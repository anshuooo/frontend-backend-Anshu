import React from 'react';

const Card = ({ children, className = '', hover = true }) => {
    return (
        <div
            className={`bg-white rounded-lg shadow-md p-6 transition-all duration-200 ${hover ? 'hover:shadow-xl hover:-translate-y-1' : ''
                } ${className}`}
        >
            {children}
        </div>
    );
};

export default Card;
