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

  return (
    <Container className="container">
      <Typography variant="h4">{isEditing ? "Redigera Produkt" : "Lägg till Produkt"}</Typography>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "20px" }}>
        <TextField label="Title" title="title" value={product.title} onChange={handleChange} required />
        <TextField label="Pris" title="price" type="number" value={product.price} onChange={handleChange} required />
        <TextField label="Bild-URL" title="image" value={product.image} onChange={handleChange} required />
        <TextField label="Beskrivning" title="description" value={product.description} onChange={handleChange} multiline rows={3} required />
        <Button variant="contained" color="primary" type="submit">Spara</Button>
      </form>
    </Container>
  );
};

export default EditProduct;