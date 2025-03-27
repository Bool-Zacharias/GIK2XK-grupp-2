
import React, { useEffect, useState } from "react";
import { fetchProducts } from "../services/ProductService";
import ProductCard from "../components/ProductCard";
import { Grid2, Container, Typography } from "@mui/material";
import { CalcAverageRating } from "../components/CalcAverageRating";

const ProductPage = () => {
  const [products, setProducts] = useState([]); // Lista med produkter

  // Hårdkodad användare för test – byt ut mot inloggad användare vid behov (för demo)
  const userId = 1;

  // Hämtar produktdata när sidan laddas
  useEffect(() => {
    fetchProducts().then(setProducts);
  }, []);

  // props som skickas till productCard, parent och child element
  return (
    <Container>
      <Typography variant="h3" gutterBottom>Produktlista</Typography>
      <Grid2 container spacing={4}>
        {products.map((product) => {
          const averageRating = CalcAverageRating(product.ratings);
          return (
            <Grid2 item key={product.id} xs={12} sm={6} md={4}>
              <ProductCard product={product} averageRating={averageRating} userId={userId} />
            </Grid2>
          );
        })}
      </Grid2>
    </Container>
  );
};

export default ProductPage;