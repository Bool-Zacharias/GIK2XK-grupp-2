import axios from "axios";

const API_BASE_URL = "http://localhost:3000/product";

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
