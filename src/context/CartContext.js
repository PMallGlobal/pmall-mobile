import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    const addItemToCart = (item) => {
        setCartItems((prevItems) => [...prevItems, item]);
    };

    const removeItemFromCart = (itemId) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
    };

    const cartCount = cartItems?.length;

    return (
        <CartContext.Provider value={{ cartItems, addItemToCart, removeItemFromCart, cartCount }}>
            {children}
        </CartContext.Provider>
    );
};
