import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CartItemCard from '../components/CartItemCard';
import CategoryHeader from '../components/CategoryHeader';
import { removeFromCart, getCart } from '../utils/cartUtils';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Toast from '../utils/Toast';
import './Cart.css'; // Import the new CSS

export default function Cart() {
  const [cart, setCart] = useState(getCart() || []);
  const [toast, setToast] = useState(null);
  const navigate = useNavigate();

  // Recalculate subtotal whenever cart changes
  const subtotal = cart.reduce((total, item) => {
    return total + (Number(item.selling_price || 0) * Number(item.amtItems || 1));
  }, 0);

  // Derived cart count
  const cartCount = cart.reduce((sum, item) => sum + (item.amtItems || 1), 0);

  const handleClearCart = () => {
    if (window.confirm("Are you sure you want to clear your entire cart?")) {
      localStorage.removeItem("pmallCart");
      setCart([]);
      setToast({ message: "Cart cleared successfully", type: "success" });
    }
  };

  const handleDeleteItem = (productId) => {
    if (window.confirm(`Remove item from cart?`)) {
      const updatedCart = removeFromCart(productId);
      setCart(updatedCart);
      setToast({ message: "Item removed from cart", type: "success" });
    }
  };

  const handleQuantityChange = (productId, change) => {
    const currentCart = getCart() || [];
    const updatedCart = currentCart.map((item) => {
      if (item?.id === productId) {
        let newQty = (item.amtItems || 1) + change;
        newQty = Math.max(1, newQty); // Minimum 1
        
        // Use `quantity` instead of `inStock` based on our earlier fix!
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
  };

  return (
    <div className="cart-page">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      
      <header className="cart-topbar">
        <CategoryHeader title="My Cart" />
        {cart.length > 0 && (
          <button className="cart-clear-btn" onClick={handleClearCart}>
            Clear
          </button>
        )}
      </header>

      {cart.length === 0 ? (
        <div className="cart-empty">
          <div className="cart-empty__icon-wrap">
            <ShoppingCartOutlinedIcon style={{ fontSize: 60 }} />
          </div>
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added anything yet.</p>
          <button className="cart-empty__btn" onClick={() => navigate('/')}>
            Start Shopping
          </button>
        </div>
      ) : (
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

          <div className="cart-summary-block">
            <div className="cart-summary-row">
              <span>Subtotal ({cartCount} items)</span>
              <span>₦{subtotal.toLocaleString()}</span>
            </div>
            <div className="cart-summary-row text-muted">
              <span>VAT (7.5%)</span>
              <span>Calculated at checkout</span>
            </div>
            <div className="cart-summary-row text-muted">
              <span>Delivery</span>
              <span>Calculated at checkout</span>
            </div>
          </div>
        </div>
      )}

      {/* Sticky Checkout Bar */}
      {cart.length > 0 && (
        <div className="cart-sticky-footer">
          <div className="cart-total">
            <p className="cart-total__label">Total</p>
            <p className="cart-total__amount">₦{subtotal.toLocaleString()}</p>
          </div>
          <button className="cart-checkout-btn" onClick={() => navigate('/checkout')}>
            Checkout
          </button>
        </div>
      )}
    </div>
  );
}