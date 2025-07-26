"use client"
import { useState } from 'react';
import { Headers } from './components/Header'; 
import { ProductList } from './components/ProductList';
import { Login } from './components/auth/Login';
import { Register } from './components/auth/Register';
import { Invoice } from './components/Invoice';
import { Toast } from './components/Toast';
import { BookSummaryModal } from './components/BookSummaryModal';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/features/auth/authSlice';

export default function Home() {
  const [allProducts, setAllProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [countProducts, setCountProducts] = useState(0);
  const [showAuth, setShowAuth] = useState(true);
  const [isRegistering, setIsRegistering] = useState(false);
  const [showInvoice, setShowInvoice] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const [toast, setToast] = useState({ message: '', type: '', visible: false });

  const showToast = (message, type) => {
    setToast({ message, type, visible: true });
  };

  const hideToast = () => {
    setToast({ ...toast, visible: false });
  };

  const handleLoginSuccess = () => {
    showToast('Inicio de sesión exitoso. ¡Bienvenido/a!', 'success');
    setShowAuth(false);
  };

  const handleRegisterSuccess = () => {
    showToast('Registro exitoso. ¡Ahora puedes iniciar sesión!', 'success');
    setIsRegistering(false);
  };

  const handleLoginFailure = (message) => {
    showToast(message, 'error');
  };

  const handleLogout = () => {
    dispatch(logout());
    showToast('Sesión cerrada correctamente.', 'success');
    setShowAuth(true);
    setAllProducts([]);
    setTotal(0);
    setCountProducts(0);
    setShowInvoice(false);
  };

  const handleGenerateInvoice = () => {
    if (allProducts.length === 0) {
      showToast('El carrito está vacío. Añade productos para generar una factura.', 'error');
      return;
    }
    setShowInvoice(true);
  };

  const handleInvoiceComplete = () => {
    setAllProducts([]);
    setTotal(0);
    setCountProducts(0);
    setShowInvoice(false);
    showToast('¡Compra realizada con éxito! Carrito vaciado.', 'success');
  };

  const handleClearCart = () => {
    setAllProducts([]);
    setTotal(0);
    setCountProducts(0);
    showToast('Carrito vaciado.', 'success');
  };

  const handleOpenBookSummary = (book) => {
    setSelectedBook(book);
  };

  const handleCloseBookSummary = () => {
    setSelectedBook(null);
  };


  const onAddProduct = (product) => {
    const existingProductIndex = allProducts.findIndex(
      (item) => item.id === product.id
    );

    if (existingProductIndex !== -1) {
      const updatedProducts = allProducts.map((item, index) =>
        index === existingProductIndex
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setTotal(total + product.price);
      setCountProducts(countProducts + 1);
      setAllProducts(updatedProducts);
      showToast(`Se añadió otra unidad de ${product.title} al carrito.`, 'info');
    } else {
      setTotal(total + product.price);
      setCountProducts(countProducts + 1);
      setAllProducts([...allProducts, { ...product, quantity: 1 }]);
      showToast(`${product.title} se añadió al carrito.`, 'success');
    }
  };


  if (showAuth) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        padding: '20px',
        boxSizing: 'border-box'
      }}>
        {isRegistering ? (
          <Register onRegisterSuccess={handleRegisterSuccess} showLogin={() => setIsRegistering(false)} />
        ) : (
          <Login onLoginSuccess={handleLoginSuccess} onLoginFailure={handleLoginFailure} showRegister={() => setIsRegistering(true)} />
        )}
        {toast.visible && <Toast message={toast.message} type={toast.type} onClose={hideToast} />}
      </div>
    );
  }

  return (
    <>
      <Headers
        allProducts={allProducts}
        setAllProducts={setAllProducts}
        total={total}
        setTotal={setTotal}
        countProducts={countProducts}
        setCountProducts={setCountProducts}
        isAuthenticated={isAuthenticated}
        user={user}
        onLogout={handleLogout}
        onGenerateInvoice={handleGenerateInvoice}
        onClearCart={handleClearCart}
        showToast={showToast}
      />
      <ProductList
        allProducts={allProducts}
        setAllProducts={setAllProducts}
        total={total}
        setTotal={setTotal}
        countProducts={countProducts}
        setCountProducts={setCountProducts}
        showToast={showToast}
        onAddProduct={onAddProduct} 
        onOpenBookSummary={handleOpenBookSummary}
      />

      {showInvoice && (
        <Invoice
          allProducts={allProducts}
          total={total}
          onClose={handleInvoiceComplete}
        />
      )}
      {selectedBook && (
        <BookSummaryModal
          book={selectedBook}
          onClose={handleCloseBookSummary}
          onAddProduct={onAddProduct} 
        />
      )}
      {toast.visible && <Toast message={toast.message} type={toast.type} onClose={hideToast} />}
    </>
  );
}