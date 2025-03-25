//Hämtar produktinformation baserat på ID i URL:en (useParams).
//Visar produktens bild, namn, pris och betyg.

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProductById, updateProductRating } from "../services/ProductService";
import { Container, Typography, Card, CardMedia, CardContent, Rating, Button } from "@mui/material";
import RatingBreakdown from "../components/RatingBreakdown";
import { addToCart } from "../services/CartServices";


const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [userRating, setUserRating] = useState(0);

  useEffect(() => {
    fetchProductById(id).then((data) => {
      setProduct(data);
    });
  }, [id]);

  const calculateAverage = (ratings) => {
    if (!ratings || ratings.length === 0) return "Ingen än";
    const sum = ratings.reduce((a, b) => a + b, 0);
    return (sum / ratings.length).toFixed(1);
  };

  const handleRatingChange = async (newValue) => {
    if (newValue !== null) {
      setUserRating(newValue);

      // Uppdatera betyget i backend/localStorage
      const updatedProduct = await updateProductRating(id, newValue);

      if (updatedProduct) {
        setProduct({ ...updatedProduct });
      }
    }
  };

  if (!product) return <Typography variant="h5">Laddar...</Typography>;

  const averageRating = calculateAverage(product.ratings);

  return (
    <Container className="container">
      <Card>
        <CardMedia component="img" height="250" image={product.image} alt={product.name} />
        <CardContent style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%" }}>
          <div>
            <Typography variant="h4">{product.title}</Typography>
            <Typography variant="h6">{product.fullDescription}</Typography>
            <Typography variant="h5">Pris: {product.price} kr</Typography>
            <Typography variant="h6">
              Snittbetyg: {averageRating}
              <Rating value={parseFloat(averageRating) || 0} precision={0.1} readOnly />
            </Typography>
            <RatingBreakdown ratings={product.ratings} />
            
            <Typography variant="h6" style={{ marginTop: "10px" }}>Sätt ditt betyg:</Typography>
            <Rating value={userRating} precision={0.5} onChange={handleRatingChange} />
          </div>

          {/* Knappen ligger längst ner till höger */}
          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "20px" }}>
                    <Button
            variant="contained"
            color="primary"
            onClick={() => addToCart(product.id, 1)} // Här använder vi 1 som ett exempel på user_id.
          >
            Lägg till i varukorg
          </Button>

          </div>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ProductDetails;