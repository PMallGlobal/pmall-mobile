
export const getCart = () => {
  try {
    const cart = localStorage.getItem("pmallCart");
    return cart ? JSON.parse(cart) : [];
  } catch (error) {
    console.error("Error reading cart:", error);
    return [];
  }
};

// cartUtils.js

export const removeFromCart = (productId) => {
  try {
    let cart = getCart() || [];

    // Filter out the item with matching ID
    const updatedCart = cart.filter(item => item?.id !== productId);

    // Save back to localStorage
    localStorage.setItem("pmallCart", JSON.stringify(updatedCart));

    return updatedCart; // return updated cart so you can update UI/count
  } catch (error) {
    console.error("Failed to remove item from cart:", error);
    return getCart(); // return current cart on failure
  }
};

export const clearCart = () => {
  try {
    localStorage.removeItem("pmallCart");
    console.log("Cart cleared successfully");
    return []; // return empty array so you can update state
  } catch (error) {
    console.error("Failed to clear cart:", error);
    return getCart() || []; // return current (failed to clear)
  }
};
let cart = getCart() || [];
export const calculateSubtotal = (cart = []) => {
  return cart.reduce((total, item) => {
    const price = Number(item.selling_price || 0);
    const quantity = Number(item.amtItems || 1);
    return total + price * quantity;
  }, 0);
};

export const cartNum = cart.length

export const dFee = 1245; 

export const subtotal = calculateSubtotal(cart)
export const vat = subtotal * 0.075; 
export const Total = subtotal + vat + dFee