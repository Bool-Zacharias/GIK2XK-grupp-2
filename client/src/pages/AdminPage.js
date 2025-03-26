import React, { useState } from "react";
import { createProduct } from "../services/ProductService";
import { Container, TextField, Button, Typography, MenuItem } from "@mui/material";

const AdminPage = () => {
  const [mode, setMode] = useState("create"); // "create", "edit", "delete"

  const [newProduct, setNewProduct] = useState({
    title: "",
    price: "",
    image: "",
    rating: [],
    description: "",
    fullDescription: "",
  });

  const handleChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createProduct(newProduct);
    alert("Produkt skapad!");
    setNewProduct({
      title: "",
      price: "",
      image: "",
      rating: [],
      description: "",
      fullDescription: "",
    });
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Admin: {mode === "create" ? "Lägg till" : mode === "edit" ? "Redigera" : "Ta bort"} produkt</Typography>

      <div style={{ marginBottom: "20px" }}>
        <TextField
          select
          label="Välj åtgärd"
          value={mode}
          onChange={(e) => setMode(e.target.value)}
          variant="outlined"
        >
          <MenuItem value="create">Lägg till produkt</MenuItem>
          <MenuItem value="edit">Redigera produkt</MenuItem>
          <MenuItem value="delete">Ta bort produkt</MenuItem>
        </TextField>
      </div>

      {mode === "create" && (
        <form onSubmit={handleSubmit}>
          <TextField label="Title" name="title" value={newProduct.title} onChange={handleChange} fullWidth margin="normal" required />
          <TextField label="Pris" name="price" type="number" value={newProduct.price} onChange={handleChange} fullWidth margin="normal" required />
          <TextField label="Bild-URL" name="image" value={newProduct.image} onChange={handleChange} fullWidth margin="normal" />
          <TextField label="Kort beskrivning" name="description" value={newProduct.description} onChange={handleChange} fullWidth margin="normal" required />
          <TextField label="Full beskrivning" name="fullDescription" value={newProduct.fullDescription} onChange={handleChange} fullWidth margin="normal" required />
          <Button type="submit" variant="contained" color="primary">Skapa produkt</Button>
        </form>
      )}

      {mode === "edit" && (
        <Typography variant="body1"> Redigera-produktfunktion kommer snart...</Typography>
      )}

      {mode === "delete" && (
        <Typography variant="body1"> Ta bort-produktfunktion kommer snart...</Typography>
      )}
    </Container>
  );
};

export default AdminPage;