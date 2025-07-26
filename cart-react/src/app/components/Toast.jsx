// src/app/components/Toast.jsx
"use client";
import React, { useEffect, useState } from 'react';

export const Toast = ({ message, type, onClose }) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            if (onClose) {
                onClose();
            }
        }, 3000); 

        return () => clearTimeout(timer);
    }, [onClose]);

    if (!isVisible) return null;

    return (
        <div className={`Toast ${type}`}>
            <span>{message}</span>
        </div>
    );
};