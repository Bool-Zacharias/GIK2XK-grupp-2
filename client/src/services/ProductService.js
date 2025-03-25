//fetchProducts returnerar en lista av produkter.
//fetchProductById hämtar en enskild produkt baserat på ID.

import axios from './api';

const API_BASE_URL = "http://localhost:5000/product"; 

// Hämtar produkter 
export const fetchProducts = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Fel vid hämtning av produkter:", error);
    return[];
  }
};

// Hämtar en enskild produkt
export const fetchProductById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    return console.error("Använder localStorage istället:", error);
  }
};

// Skapar en ny produkt (används i adminpanelen)
export const createProduct = async (product) => {
  try {
    const response = await axios.post(API_BASE_URL, product);
    return response.data;
  } catch (error) {
    console.error("fel vid skapande av produkt", error);
    return product;
  }
};

// Lägg till produktbetyget
export const updateProductRating = async (id, rating) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/${id}/addRating`);
    return response.data;
  } catch (error) {
    console.error("Fel vid uppdatering av produktbetyg:", error);
    return { id, rating };
  }
};