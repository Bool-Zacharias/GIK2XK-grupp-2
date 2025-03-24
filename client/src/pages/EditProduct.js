import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, TextField, Button, Typography } from "@mui/material";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = id !== "new"; // 🟢 Redigeringsläge om id != "new"

  const [product, setProduct] = useState({
    name: "",
    price: "",
    image: "",
    description: "",
  });

  useEffect(() => {
    if (isEditing) {
      const products = JSON.parse(localStorage.getItem("products")) || [];
      const existingProduct = products.find((p) => p.id === id);
      if (existingProduct) {
        setProduct(existingProduct);
      }
    }
  }, [id, isEditing]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let products = JSON.parse(localStorage.getItem("products")) || [];

    if (isEditing) {
      // 🟢 Uppdatera befintlig produkt
      products = products.map((p) => (p.id === id ? product : p));
    } else {
      // 🟢 Lägg till ny produkt
      product.id = new Date().getTime().toString(); // Skapar ett unikt ID
      products.push(product);
    }

    localStorage.setItem("products", JSON.stringify(products));
    navigate("/products");
  };

  return (
    <Container className="container">
      <Typography variant="h4">{isEditing ? "Redigera Produkt" : "Lägg till Produkt"}</Typography>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "20px" }}>
        <TextField label="Namn" name="name" value={product.name} onChange={handleChange} required />
        <TextField label="Pris" name="price" type="number" value={product.price} onChange={handleChange} required />
        <TextField label="Bild-URL" name="image" value={product.image} onChange={handleChange} required />
        <TextField label="Beskrivning" name="description" value={product.description} onChange={handleChange} multiline rows={3} required />
        <Button variant="contained" color="primary" type="submit">Spara</Button>
      </form>
    </Container>
  );
};

export default EditProduct;