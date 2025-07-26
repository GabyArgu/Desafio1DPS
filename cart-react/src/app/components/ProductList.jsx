// src/app/components/ProductList.jsx
"use client"
import React, { useState } from "react";
import { data } from "../data";
import { BookSummaryModal } from "./BookSummaryModal";

export const ProductList = ({
    allProducts,
    setAllProducts,
    countProducts,
    setCountProducts,
    total,
    setTotal,
    showToast,
    onAddProduct, 
    onOpenBookSummary, 
}) => {
    const [selectedBook, setSelectedBook] = useState(null);

    const openBookSummary = (book) => {
        onOpenBookSummary(book);
    };

    const closeBookSummary = () => {
        setSelectedBook(null); 
    };

    return (
        <>
            <div className='container-items'>
                {data.map(product => (
                    <div className='item' key={product.id}>
                        <figure onClick={() => openBookSummary(product)}>
                            <img src={product.urlImage} alt={product.title} />
                        </figure>
                        <div className='info-product'>
                            <h2>{product.title}</h2>
                            <p className='price'>${product.price}</p>
                            <button onClick={() => onAddProduct(product)}> 
                                Añadir al carrito
                            </button>
                        </div>
                    </div>
                ))}
            </div>

        
        </>
    );
};