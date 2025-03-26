// CartServices.js
// Hanterar API-anrop relaterade till varukorgen

import axios from './api';

const API_BASE_URL = "http://localhost:5000/product";

// Lägger till en produkt i varukorgen för en viss användare
// Parametrar: produkt-id och user_id
export const addToCart = async (id, user_id) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/${id}/addToCart`, {
      user_id: user_id,
      amount: 1, // Lägger alltid till 1 st
    });
    return response.data;
  } catch (error) {
    console.error("Kunde inte lägga till i varukorgen:", error);
    throw error;
  }
};

// Tar bort en produkt från varukorgen (ej implementerad i backend än?)
export const removeFromCart = async (id, user_id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/${id}/`, {
      user_id: user_id,
    });
    return response.data;
  } catch (error) {
    console.error("Kunde inte ta bort från varukorgen:", error);
    throw error;
  }
};

// Hämtar aktuell varukorg för en användare
export const fetchCartByUser = async (user_id) => {
  try {
    const response = await axios.get(`http://localhost:5000/user/${user_id}/getCart/`);
    return response.data;
  } catch (error) {
    console.error("Fel vid hämtning av varukorg:", error);
    return null;
  }
};