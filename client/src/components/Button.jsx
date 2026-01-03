import React from 'react';

const Button = ({
    children,
    variant = 'primary',
    className = '',
    type = 'button',
    fullWidth = false,
    ...props
}) => {
    const baseStyles = "inline-flex items-center justify-center px-6 py-3 rounded-[20px] font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-soft hover:shadow-medium";

    const variants = {
        primary: "bg-primary text-white hover:bg-primary-dark focus:ring-primary",
        secondary: "bg-secondary text-white hover:bg-secondary-light focus:ring-secondary",
        outline: "bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white focus:ring-primary",
        ghost: "bg-transparent text-text-light hover:bg-sand hover:text-text-dark shadow-none",
        accent: "bg-accent text-white hover:bg-accent-dark focus:ring-accent",
    };

    const widthClass = fullWidth ? "w-full" : "";

    return (
        <button
            type={type}
            className={`${baseStyles} ${variants[variant]} ${widthClass} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
