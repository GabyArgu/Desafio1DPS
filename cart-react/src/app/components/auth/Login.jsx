// src/app/components/auth/Login.jsx
"use client";
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../../redux/features/auth/authSlice';

export const Login = ({ onLoginSuccess, onLoginFailure, showRegister }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    const handleLogin = (e) => {
        e.preventDefault();
        const storedUser = JSON.parse(localStorage.getItem('registeredUser'));

        if (storedUser && storedUser.username === username && storedUser.password === password) {
            dispatch(login({ username }));
            onLoginSuccess();
        } else {
            onLoginFailure('Credenciales incorrectas o usuario no registrado.'); 
        }
    };

    return (
        <div className="auth-container">
            <h2>Inicio de Sesión</h2>
            <form onSubmit={handleLogin} className="auth-form">
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
                <button type="submit" className="auth-button login-button">
                    Iniciar Sesión
                </button>
            </form>
            <p className="auth-switch-text">
                ¿No tienes cuenta? <span onClick={showRegister} className="auth-switch-link">Regístrate aquí</span>
            </p>
        </div>
    );
};