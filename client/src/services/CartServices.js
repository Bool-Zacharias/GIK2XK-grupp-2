import axios from './api';

const API_BASE_URL = "http://localhost:5000/product";

// Lägg till en produkt i varukorgen för en given användare
// Parametrar: productId, user_id, och amount (standardvärde 1)
export const addToCart = async (id, user_id, amount) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/${id}/addToCart`, {
      user_id: user_id,
      amount: amount,
    });
    return response.data;
  } catch (error) {
    console.error("Kunde inte lägga till i varukorgen:", error);
    throw error;
  }
};

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

export const fetchCartByUser = async (user_id) => {
  try {
    const response = await axios.get(`http://localhost:5000/user/${user_id}/getCart/`);
    return response.data;
  } catch (error) {
    console.error("Fel vid hämtning av varukorg:", error);
    return null;
  }
};