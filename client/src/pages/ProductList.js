//Hämtar produkter från fetchProducts och sparar i state
//Loopar igenom produkterna och renderar ProductCard för varje produkt

import React, { useEffect, useState } from "react";
import { fetchProducts } from "../services/ProductService";
import ProductCard from "../components/ProductCard";
import { Grid, Container, Typography } from "@mui/material";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts().then(setProducts);
  }, []);

  return (
    <Container>
      <Typography variant="h3" gutterBottom>Produktlista</Typography>
      <Grid container spacing={4}>
        {products.map(product => (
          <Grid item key={product.id} xs={12} sm={6} md={4}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ProductList;