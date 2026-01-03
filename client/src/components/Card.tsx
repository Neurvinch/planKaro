import React, { ReactNode, HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '', ...props }) => {
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
