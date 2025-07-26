// src/app/components/Headers.jsx
"use client"
import React, { useState } from 'react';
import Image from 'next/image';

export const Headers = ({
    allProducts,
    setAllProducts,
    total,
    setTotal,
    countProducts,
    setCountProducts,
    isAuthenticated,
    user,
    onLogout,
    onGenerateInvoice,
    onClearCart,
    showToast,
}) => {
    const [active, setActive] = useState(false);

    const onDeleteProduct = product => {
        const products = allProducts.filter(item => item.id !== product.id);
        setTotal(total - product.price * product.quantity);
        setCountProducts(countProducts - product.quantity);
        setAllProducts(products);
        showToast(`"${product.title}" eliminado del carrito.`, 'error'); 
    };

    const handleClearAllCart = () => {
        if (allProducts.length === 0) {
            showToast('El carrito ya está vacío.', 'info');
            return;
        }
        onClearCart(); 
    };

    const handleGenerateInvoiceClick = () => {
        if (allProducts.length === 0) {
            showToast('No hay productos en el carrito para generar una factura.', 'warning');
            return;
        }
        setActive(false);
        onGenerateInvoice(); 
    };

    return (
        <header>
            <div className="header-left-section">
                <img src="/icons/logo.png" alt="" className="logo" width={40} />
            <h1 className="store-title">El ovelisco del savor</h1>
            </div>
            
            <div className="header-right-section">
                {isAuthenticated && (
                    <div className="auth-buttons-container">
                        <button onClick={onLogout} className="btn-header logout-button">
                            <Image
                                src="/icons/logout.png"
                                alt="Cerrar Sesión"
                                width={25}
                                height={25}
                                className="icon-button-img"
                            />
                            <span className="button-text">Cerrar Sesión</span>
                        </button>
                    </div>
                )}

                <div className='container-icon'>
                    <span className="container-cart-icon" onClick={() => setActive(!active)} role="img" aria-label="cart">
                        <Image
                            src="/icons/cart.png"
                            alt="Carrito de Compras"
                            width={35}
                            height={35}
                            className="icon-cart-img"
                        />
                        <div className='count-products'>{countProducts}</div>
                    </span>

                    <div className={`container-cart-products ${active ? '' : 'hidden-cart'}`}>
                        {allProducts.length ? (
                            <>
                                <div className='row-product'>
                                    {allProducts.map(product => (
                                        <div className='cart-product' key={product.id}>
                                            <figure className="cart-product-image-container">
                                                <img src={product.urlImage} alt={product.title} className="cart-product-image" />
                                            </figure>
                                            <div className='info-cart-product'>
                                                <span className='cantidad-producto-carrito'>{product.quantity}</span>
                                                <p className='titulo-producto-carrito'>{product.title}</p>
                                                <span className='precio-producto-carrito'>${product.price}</span>
                                            </div>
                                            <span onClick={() => onDeleteProduct(product)} className="icon-close" role="img" aria-label="close">
                                                ✖️
                                            </span>
                                        </div>
                                    ))}
                                </div>
                                <div className='cart-total'>
                                    <h3>Total:</h3>
                                    <span className='total-pagar'>${total.toFixed(2)}</span>
                                </div>
                                <button onClick={handleGenerateInvoiceClick} className="btn-buy-in-cart">
                                    Pagar y Generar Factura
                                </button>
                                <button className='btn-clear-all' onClick={handleClearAllCart}>
                                    Vaciar Carrito
                                </button>
                            </>
                        ) : (
                            <p className='cart-empty'>El carrito está vacío</p>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};