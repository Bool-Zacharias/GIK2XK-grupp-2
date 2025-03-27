import React, { useEffect, useState } from "react";
import { fetchProductById, updateProduct } from "../services/ProductService";
import { useParams, useNavigate } from "react-router-dom";
import { Container, TextField, Button, Typography } from "@mui/material";

// Formulär för att skapa eller redigera en produkt
const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = id !== "new"; // true = redigera, false = ny produkt

  const [product, setProduct] = useState({
    title: "",
    price: "",
    image: "",
    description: "",
    id: "",
  });

  useEffect(() => {
    if (isEditing) {
      // Hämta den befintliga produkten från backend
      fetchProductById(id).then((data) => {
        if (data) {
          setProduct(data);
        }
      });
    }
  }, [id, isEditing]);

  // Hämtar alla värden från product sen använder vi nya värden
  const handleChange = (e) => {
    setProduct({ ...product, [e.target.title]: e.target.value });
  };

  const handleSubmit = (e) => { 
    e.preventDefault();

    if (isEditing) {
      // Uppdaterar produkten i listan
      updateProduct(id, product);
     } else {
      // Lägger till ny produkt
      product.id = new Date().getTime().toString();
      product.push(product);
    }

    navigate("/product"); // Navigerar tillbaka till produktlistan
  };
};

export default EditProduct;