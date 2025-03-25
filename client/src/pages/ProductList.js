// src/pages/ProductList.jsx
import React, { useEffect, useState } from "react";
import { fetchProducts } from "../services/ProductService";
import ProductCard from "../components/ProductCard";
import { Grid, Container, Typography } from "@mui/material";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  // Hardkodad userId för testning; byt ut med korrekt värde vid inloggning
  const userId = 1;

  useEffect(() => {
    fetchProducts().then(setProducts);
  }, []);

  return (
    <Container>
      <Typography variant="h3" gutterBottom>Produktlista</Typography>
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
