import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CartItemCard from '../components/CartItemCard';
import CategoryHeader from '../components/CategoryHeader';
import { removeFromCart, getCart } from '../utils/cartUtils';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Toast from '../utils/Toast';
import './Cart.css'; 

export default function Cart() {
  const [cart, setCart] = useState(getCart() || []);
  const [toast, setToast] = useState(null);
  const navigate = useNavigate();

  // Recalculate subtotal
  const subtotal = cart.reduce((total, item) => {
    return total + (Number(item.selling_price || 0) * Number(item.amtItems || 1));
  }, 0);

  const cartCount = cart.reduce((sum, item) => sum + (item.amtItems || 1), 0);

  const handleClearCart = () => {
    if (window.confirm("Are you sure you want to clear your entire cart?")) {
      localStorage.removeItem("pmallCart");
      setCart([]);
      window.dispatchEvent(new Event('cartUpdated')); // Sync header
      setToast({ message: "Cart cleared successfully", type: "success" });
    }
  };

  const handleDeleteItem = (productId) => {
    const updatedCart = removeFromCart(productId);
    setCart(updatedCart);
    window.dispatchEvent(new Event('cartUpdated')); // Sync header
    setToast({ message: "Item removed from cart", type: "success" });
  };

  const handleQuantityChange = (productId, change) => {
    const currentCart = getCart() || [];
    const updatedCart = currentCart.map((item) => {
      if (item?.id === productId) {
        let newQty = (item.amtItems || 1) + change;
        newQty = Math.max(1, newQty); 
        
        const availableStock = Number(item.quantity) || 9999; 
        
        if (newQty > availableStock) {
          setToast({ message: `Only ${availableStock} available in stock`, type: "error" });
          newQty = availableStock;
        }
        return { ...item, amtItems: newQty };
      }
      return item;
    });

    localStorage.setItem("pmallCart", JSON.stringify(updatedCart));
    setCart(updatedCart);
    window.dispatchEvent(new Event('cartUpdated'));
  };

  return (
    <div className="cart-page">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      
      <header className="cart-topbar">
        <CategoryHeader title="My Cart" image="true" />
        {cart.length > 0 && (
          <button className="cart-clear-btn" onClick={handleClearCart}>
            Clear
          </button>
        )}
      </header>

      {cart.length === 0 ? (
        <div className="cart-empty">
          <div className="cart-empty-icon">
            <ShoppingCartOutlinedIcon style={{ fontSize: 48 }} />
          </div>
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added anything yet.</p>
          <button className="cart-empty-btn" onClick={() => navigate('/')}>
            Start Shopping
          </button>
        </div>
      ) : (
        <>
          <div className="cart-content">
            <div className="cart-items-list">
              {cart.map((item) => (
                <CartItemCard 
                  key={item.id}
                  cartItem={item} 
                  handleDeleteItem={handleDeleteItem} 
                  handleQuantityChange={handleQuantityChange} 
                />
              ))}
            </div>

            <div className="cart-summary-info">
              <span>Subtotal ({cartCount} items)</span>
              <strong>₦{subtotal.toLocaleString()}</strong>
            </div>
          </div>

          <div className="cart-sticky-footer">
            <div className="cart-total">
              <p className="cart-total-label">Total Amount</p>
              <p className="cart-total-amount">₦{subtotal.toLocaleString()}</p>
            </div>
            <button className="cart-checkout-btn" onClick={() => navigate('/checkout')}>
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}