import React, { useEffect, useState } from 'react'
import CartItemCard from '../components/CartItemCard'
import CartSummary from '../components/CartSummary';
import CategoryHeader from '../components/CategoryHeader'
import { removeFromCart, getCart, clearCart } from '../utils/cartUtils';


export default function Cart() {
  const [cart, setCartItems] = useState(getCart() || []);
  const [cartMessage, setCartMessage] = useState("");
  const [cartCount, setCartCount] = useState(0)

  const calculateSubtotal = (cart = []) => {
    return cart.reduce((total, item) => {
      const price = Number(item.selling_price || 0);
      const quantity = Number(item.amtItems || 1);
      return total + price * quantity;
    }, 0);
  };
  const [subtotal,setSubtotal] = useState(calculateSubtotal(cart))
  console.log(subtotal)

  const [showConfirm, setShowConfirm] = useState(false);

  const handleClearCart = () => {
    const confirmed = window.confirm(
      "Are you sure you want to clear your entire cart? This action cannot be undone."
    );
  
    if (confirmed) {
      try {
        localStorage.removeItem("pmallCart");
        
        setCartItems([]); 
  
        if (typeof setCartCount === 'function') {
          setCartCount(0);
        }
  
        setCartMessage(
          <div className="success-message">
            Cart cleared successfully!
          </div>
        );
  
        setTimeout(() => setCartMessage(""), 5000);
      } catch (error) {
        console.error("Failed to clear cart:", error);
        setCartMessage(
          <div className="error-message">
            Failed to clear cart. Please try again.
          </div>
        );
      }
    }
  };

  const handleDeleteItem = (productId) => {
    if (window.confirm(`Remove item from cart?`)) {
      const updatedCart = removeFromCart(productId);
      // ... rest of the code
  
    if (setCartItems) {
      setCartItems(updatedCart);
    }
  
    if (typeof setCartCount === 'function') {
      const newTotal = updatedCart.reduce((sum, item) => sum + (item.amtItems || 1), 0);
      setCartCount(newTotal);
    }
  
    setCartMessage(
      <div className="success-message">
        Item removed from cart
      </div>
    );
  
    setTimeout(() => setCartMessage(""), 5000);
    }
  };

  const handleQuantityChange = (productId, change) => {
    const cart = getCart() || [];
  
    const updatedCart = cart.map((item) => {
      if (item?.id === productId) {
        let newQty = (item.amtItems || 1) + change;
  
        // 1. Minimum: never below 1
        newQty = Math.max(1, newQty);
  
        // 2. Maximum: respect available stock
        const availableStock = Number(item.inStock) || 9999; // fallback if missing
        if (newQty > availableStock) {
          // Show warning message
          setCartMessage(
            <div className="warning">
              Only {availableStock} available in stock
            </div>
          );
          setTimeout(() => setCartMessage(""), 4000);
  
          // Cap at stock limit
          newQty = availableStock;
        }
  
        return { ...item, amtItems: newQty };
      }
      return item;
    });
  
    // Save to localStorage
    try {
      localStorage.setItem("pmallCart", JSON.stringify(updatedCart));
    } catch (err) {
      console.error("Failed to save cart:", err);
    }
  
    // Update UI state (triggers re-render + subtotal recalc)
    setCartItems(updatedCart);
  
    // Update global cart count (total quantity across all items)
    if (typeof setCartCount === 'function') {
      const newTotal = updatedCart.reduce((sum, item) => sum + (item.amtItems || 1), 0);
      setCartCount(newTotal);
    }
  };



 

  useEffect(() => {
    setSubtotal(calculateSubtotal(cart))
  }, [cart]);
  
  return (
    <div className='cart'>
        <div className='cart-main'>
            <CategoryHeader title="My Cart" />
            <div className="cart-scrollable-container">
                <div className='flex flex-col g-20'> 
                    {cart.map((item)=>(
                        <CartItemCard cartItem={item} handleDeleteItem={handleDeleteItem} handleQuantityChange={handleQuantityChange} />
                    ))}
                </div>
            </div>
        </div>

      <CartSummary subtotal={subtotal} handleClearCart={handleClearCart} />
    </div>
  )
}
