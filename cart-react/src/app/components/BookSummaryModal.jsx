// src/app/components/BookSummaryModal.jsx
"use client";
import React from 'react';
import Image from 'next/image';
import imageLoader from '../utils/imageLoader'; 

export const BookSummaryModal = ({ book, onClose, onAddProduct }) => {
    if (!book) return null;

    const handleAddClick = () => {
        if (typeof onAddProduct === 'function') {
            onAddProduct(book); 
            onClose(); 
        } else {
            console.error("onAddProduct no es una función. Asegúrate de que se pasa correctamente desde page.js");
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content book-summary-modal-content">
                <button onClick={onClose} className="modal-close-button">
                    ✖️
                </button>
                <h3>{book.title}</h3>
                <div className="book-summary-modal-body">
                    {book.urlImage && (
                        <Image
                            loader={imageLoader}
                            src={book.urlImage}
                            alt={book.title}
                            width={150}
                            height={200}
                            objectFit="cover"
                            className="book-modal-image"
                        />
                    )}
                    <div className="book-summary-modal-text">
                        <p>
                            <strong>Sinopsis:</strong> {book.summary}
                        </p>
                        {book.region && (
                            <p>
                                <strong>Autor:</strong> {book.region}
                            </p>
                        )}
                        {book.type && (
                            <p>
                                <strong>Sabor:</strong> {book.type}
                            </p>
                        )}
                        {book.coverType && (
                            <p>
                                <strong>Tipo:</strong> {book.coverType}
                            </p>
                        )}
                        <div className="price-and-add-to-cart-container">
                            <p>
                                <strong>Precio:</strong> ${book.price.toFixed(2)}
                            </p>
                            <button className="btn-add-to-cart-modal" onClick={handleAddClick}>
                                Añadir al Carrito
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};