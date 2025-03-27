import React, { useState } from "react";
import { createProduct, updateProduct, deleteProduct } from "../services/ProductService";
import { Container, TextField, Button, Typography, MenuItem } from "@mui/material";

const AdminPage = () => {
  const [mode, setMode] = useState("create"); // Hanterar om vi ska skapa, redigera eller ta bort produkt
  const [productId, setProductId] = useState(""); // Används vid redigering eller borttagning
  const [productData, setProductData] = useState({
    title: "",
    price: "",
    image: "",
    description: "",
    fullDescription: "",
  });

  // Uppdaterar produktdata när användaren skriver i formuläret
  const handleChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  // Skickar formuläret beroende på valt läge (skapa/redigera/radera)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (mode === "create") {
        await createProduct(productData);
        alert("Produkt skapad!");
      } else if (mode === "edit") {
        if (!productId) {
          alert("Ange ett produkt-ID att redigera");
          return;
        }
        await updateProduct(productId, productData);
        alert("Produkt uppdaterad!");
      } else if (mode === "delete") {
        if (!productId) {
          alert("Ange ett produkt-ID att ta bort");
          return;
        }
        await deleteProduct(productId);
        alert("Produkt raderad!");
      }

      // Töm fälten efter åtgärd
      setProductData({
        title: "",
        price: "",
        image: "",
        description: "",
        fullDescription: "",
      });
      setProductId("");
    } catch (error) {
      console.error(error);
      alert("Något gick fel. Kontrollera konsolen för detaljer.");
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Admin: {mode === "create" ? "Lägg till" : mode === "edit" ? "Redigera" : "Ta bort"} produkt
      </Typography>

      {/* Välj åtgärd (skapa/redigera/radera) */}
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

      {mode === 'create'}

      {/* Formulär för att radera produkt */}
      {mode === "delete" && (
        <form onSubmit={handleSubmit}>
          <Button type="submit" variant="contained" color="secondary">
            Ta bort produkt
          </Button>
        </form>
      )}
    </Container>
  );
};

export default AdminPage;