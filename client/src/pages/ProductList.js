// src/pages/ProductList.jsx
import React, { useEffect, useState } from "react";
import { fetchProducts } from "../services/ProductService";
import ProductCard from "../components/ProductCard";
import { Grid, Container, Typography } from "@mui/material";

const ProductList = () => {
  const [products, setProducts] = useState([]); // Lista med produkter

  // Hardkodad användare för test – byt ut mot inloggad användare vid behov
  const userId = 1;

  // Hämtar produktdata när sidan laddas
  useEffect(() => {
    fetchProducts().then(setProducts);
  }, []);

  return (
    <Container>
      {/* Rubrik för sidan */}
      <Typography variant="h3" gutterBottom>Produktlista</Typography>

      {/* Grid-layout med alla produkter */}
      <Grid container spacing={4}>
        {products.map(product => (
          <Grid item key={product.id} xs={12} sm={6} md={4}>
            <ProductCard product={product} userId={userId} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ProductList;