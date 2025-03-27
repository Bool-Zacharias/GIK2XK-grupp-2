import React, { useState } from "react";
import { createProduct, updateProduct, deleteProduct } from "../services/ProductService";
import { Container, TextField, Button, Typography, MenuItem } from "@mui/material";
import ProductForm from "../components/ProductForm";

const AdminPage = () => {
  const [mode, setMode] = useState("create");
  const [productId, setProductId] = useState("");
  const [productData, setProductData] = useState({
    title: "",
    price: "",
    image: "",
    description: "",
    fullDescription: "",
  });

  const handleChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

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
      alert("Något gick fel.");
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Admin: {mode === "create" ? "Lägg till" : mode === "edit" ? "Redigera" : "Ta bort"} produkt
      </Typography>

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

      {(mode === "edit" || mode === "delete") && (
        <TextField
          label="Produkt-ID"
          name="productId"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
      )}

      {(mode === "create" || mode === "edit") && (
        <ProductForm
          productData={productData}
          onChange={handleChange}
          onSubmit={handleSubmit}
          submitLabel={mode === "create" ? "Skapa produkt" : "Spara ändringar"}
        />
      )}

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