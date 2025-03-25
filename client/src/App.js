//Skapar routes

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import ProductDetails from "./pages/ProductDetails";
import CartPage from "./pages/Cart";
import AdminPage from "./pages/AdminPage";

const App = () => {
  return (
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<CartPage userId={1} />} /> {/* FIXA DETTA HÅRDKODAT */}
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </Router>
  );
};

export default App;
