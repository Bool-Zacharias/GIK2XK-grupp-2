import React, { useState } from "react";
import { createProduct } from "../services/ProductService";
import { Container, TextField, Button, Typography } from "@mui/material";

const AdminPage = () => {
  const [newProduct, setNewProduct] = useState({
    title: "",
    price: "",
    image: "",
    ratings: [],
    shortDescription: "",
    fullDescription: "",
  });

  const handleChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createProduct(newProduct);
    alert("Produkt skapad!");
  };

  return (
    <Container>
      <Typography variant="h4">Admin: Lägg till produkt</Typography>
      <form onSubmit={handleSubmit}>
        <TextField label="Title" name="title" value={newProduct.name} onChange={handleChange} fullWidth margin="normal" required />
        <TextField label="Pris" name="price" type="number" value={newProduct.price} onChange={handleChange} fullWidth margin="normal" required />
        <TextField label="Bild-URL" name="image" value={newProduct.image} onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Kort beskrivning" name="shortDescription" value={newProduct.shortDescription} onChange={handleChange} fullWidth margin="normal" required />
        <TextField label="Full beskrivning" name="fullDescription" value={newProduct.fullDescription} onChange={handleChange} fullWidth margin="normal" required />
        <Button type="submit" variant="contained" color="primary">Skapa produkt</Button>
      </form>
    </Container>
  );
};

export default AdminPage;
