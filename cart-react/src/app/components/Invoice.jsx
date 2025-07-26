// src/app/components/Invoice.jsx
"use client"
import React from 'react';

export const Invoice = ({ allProducts, total, onClose }) => {
    return (
        <div className="modal-overlay"> 
            <div className="modal-content"> 
                <button className="modal-close-button" onClick={onClose}> 
                    &times;
                </button>
                <h2>Tu Factura de Compra</h2>
                <p>Gracias por tu compra. Aquí tienes el detalle de tu pedido:</p>
                <br />
                <table className="invoice-table">
                    <thead>
                        <tr>
                            <th>Producto</th>
                            <th>Cantidad</th>
                            <th>Precio Unitario</th>
                            <th>Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allProducts.map((product) => (
                            <tr key={product.id}>
                                <td>{product.title}</td>
                                <td>{product.quantity}</td>
                                <td>${product.price.toFixed(2)}</td>
                                <td>${(product.quantity * product.price).toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="invoice-total">
                    <strong>Total a Pagar: ${total.toFixed(2)}</strong>
                </div>
                <p className="invoice-thank-you">¡Esperamos verte de nuevo!</p>
            </div>
        </div>
    );
};