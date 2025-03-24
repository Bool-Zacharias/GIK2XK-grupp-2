//fetchProducts returnerar en lista av produkter.
//fetchProductById hämtar en enskild produkt baserat på ID.

import axios from './api';

const API_BASE_URL = "http://localhost:3000/api/products"; // Ersätt med backend-URL

// Hämtar produkter (från API eller localStorage)
export const fetchProducts = async () => {
  try {
    const response = await fetch(API_BASE_URL);
    if (!response.ok) throw new Error("Fel vid hämtning av produkter");
    return await response.json();
  } catch (error) {
    console.error("Använder localStorage istället:", error);

    // Hämta produkter från localStorage om API ej är tillgängligt
    return JSON.parse(localStorage.getItem("products")) || [];
  }
};

// Hämtar en enskild produkt
export const fetchProductById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`);
    if (!response.ok) throw new Error("Fel vid hämtning av produkt");
    return await response.json();
  } catch (error) {
    console.error("Använder localStorage istället:", error);
    const products = await fetchProducts();
    return products.find(product => product.id === parseInt(id));
  }
};

// Skapar en ny produkt (används i adminpanelen)
export const createProduct = async (product) => {
  try {
    const response = await fetch(API_BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });
    if (!response.ok) throw new Error("Fel vid skapande av produkt");
    return await response.json();
  } catch (error) {
    console.error("Sparar i localStorage istället:", error);
    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    product.id = storedProducts.length + 1; // Simulerad ID-hantering
    storedProducts.push(product);
    localStorage.setItem("products", JSON.stringify(storedProducts));
    return product;
  }
};

// Uppdaterar produktbetyget
export const updateProductRating = async (id, rating) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}/rating`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rating }),
    });
    if (!response.ok) throw new Error("Fel vid uppdatering av betyg");
    return await response.json();
  } catch (error) {
    console.error("Uppdaterar i localStorage istället:", error);
    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    const productIndex = storedProducts.findIndex(product => product.id === parseInt(id));
    
    if (productIndex !== -1) {
      storedProducts[productIndex].ratings.push(rating);
      localStorage.setItem("products", JSON.stringify(storedProducts));
      return storedProducts[productIndex];
    }
    return null;
  }
};