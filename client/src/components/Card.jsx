import React from 'react';

const Card = ({ children, className = '', ...props }) => {
    return (
        <div
            className={`bg-white rounded-[28px] shadow-soft border border-sand/30 p-6 ${className}`}
            {...props}
        >
            {children}
        </div>
    );
};

export default Card;
