import React, { createContext, useState, useContext } from "react";

/* const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Lägg till produkt i varukorgen
  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  // Ta bort produkt från varukorgen
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // Beräkna totalpris
  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useServices(CartServices) */;

const API_BASE_URL = "http://localhost:3000/product";
import React, { createContext, useState, useContext } from "react";

export const addToCart = async (product, id,user_id ) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/${id}/addToCart`, product, user_id, {
        user_id: user_id,
        amount: 1, 
      });
  
      return response.data;
    } catch (error) {
      console.error("Kunde inte lägga till i varukorgen:", error);
      throw error;
    }
  };