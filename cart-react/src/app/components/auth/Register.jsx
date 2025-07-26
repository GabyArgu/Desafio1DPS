// src/components/auth/Register.jsx
"use client";
import React, { useState } from 'react';

export const Register = ({ onRegisterSuccess, showLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = (e) => {
        e.preventDefault();
        localStorage.setItem('registeredUser', JSON.stringify({ username, password }));
        onRegisterSuccess(); 
    };

    return (
        <div className="auth-container">
            <h2>Registro de Usuario</h2>
            <form onSubmit={handleRegister} className="auth-form">
                <div className="form-group">
                    <label>Usuario:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label>Contraseña:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="form-input"
                    />
                </div>
                <button type="submit" className="auth-button register-button">
                    Registrarse
                </button>
            </form>
            <p className="auth-switch-text">
                ¿Ya tienes cuenta? <span onClick={showLogin} className="auth-switch-link">Inicia sesión aquí</span>
            </p>
        </div>
    );
};