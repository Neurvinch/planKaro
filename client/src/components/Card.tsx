import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface CardProps extends HTMLMotionProps<'div'> {
    children: React.ReactNode;
    className?: string;
    noHover?: boolean;
}

const Card: React.FC<CardProps> = ({ children, className = '', noHover = false, ...props }) => {
    return (
        <motion.div
            className={`bg-white rounded-[28px] shadow-soft border border-sand/30 p-6 ${className}`}
            whileHover={{ y: -4, boxShadow: "0 10px 40px -10px rgba(0,0,0,0.1)" }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            {...props}
        >
            {children}
        </motion.div>
    );
};

export default Card;
