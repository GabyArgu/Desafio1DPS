// src/app/providers.js
"use client";
import { Provider } from 'react-redux';
import { store } from '../redux/store';

export function Providers({ children }) {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    );
}