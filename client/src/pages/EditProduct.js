import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, TextField, Button, Typography } from "@mui/material";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = id !== "new"; // 🟢 Redigeringsläge om id != "new"

  const [product, setProduct] = useState({
    title: "",
    price: "",
    image: "",
    description: "",
    id: "",
  });

  useEffect(() => {
    if (isEditing) {
      const existingProduct = product.find((p) => p.id === id);
      if (existingProduct) {
        setProduct(existingProduct);
      }
    }
  }, [id, isEditing]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.title]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEditing) {
      // 🟢 Uppdatera befintlig produkt
      product = product.map((p) => (p.id === id ? product : p));
    } else {
      // 🟢 Lägg till ny produkt
      product.id = new Date().getTime().toString(); // Skapar ett unikt ID
      product.push(product);
    }
    
    navigate("/product");
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