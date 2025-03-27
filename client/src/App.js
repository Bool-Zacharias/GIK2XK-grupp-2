// Skapar routes för hela webbapplikationen
// Hårdkodar användar-ID 1 för test av varukorg – bör ersättas med riktig inloggning i framtiden

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Komponenter och sidor
import Navbar from "./components/Navbar";
import Home from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import ProductDetails from "./pages/ProductDetails";
import CartPage from "./pages/CartPage";
import AdminPage from "./pages/AdminPage";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />                    {/* Startsida */}
        <Route path="/products" element={<ProductPage />} />     {/* Lista med alla produkter */}
        <Route path="/product/:id" element={<ProductDetails />} /> {/* Enskild produktsida */}
        <Route path="/cart" element={<CartPage userId={1} />} /> {/* Varukorg för användare 1 */}
        <Route path="/admin" element={<AdminPage />} />          {/* Adminpanel */}
      </Routes>
    </Router>
  );
};

export default App;