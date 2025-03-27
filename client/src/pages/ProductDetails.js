// Hämtar produktinformation baserat på ID i URL:en (useParams).
// Visar produktens bild, namn, pris, snittbetyg, betygsfördelning och låter användaren sätta nytt betyg.

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProductById, updateProductRating } from "../services/ProductService";
import { Container, Typography, Card, CardMedia, CardContent, Rating, Button } from "@mui/material";
import RatingBreakdown from "../components/RatingBreakdown";
import { addToCart } from "../services/CartServices";
import { CalcAverageRating } from "../components/CalcAverageRating";

const ProductDetails = () => {
  const { id } = useParams(); // Hämtar produktens ID från URL
  const [product, setProduct] = useState(null); // Produktdata
  const [userRating, setUserRating] = useState(0); // Användarens valda betyg

  // Hämta produktdata vid laddning
  useEffect(() => {
    fetchProductById(id).then((data) => {
      setProduct(data);
    });
  }, [id]);

// Snittbetyg
const averageRating = CalcAverageRating(product.ratings);

  // Hanterar användarens klick på betyg
  const handleRatingChange = async (newValue) => {
    if (newValue !== null) {
      setUserRating(newValue);

      const updatedProduct = await updateProductRating(id, newValue);
      if (updatedProduct) {
        // Uppdaterar produktens betygslista
        setProduct({
          ...product,
          ratings: updatedProduct.ratings || [],
        }); 
      }
    }
  };
  if (!product) return <Typography variant="h5">Laddar...</Typography>;
  return (
    <Container className="container">
      <Card>
        {/* Visar produktbild random*/}
        <CardMedia
          component="img"
          height="250"
          image={`https://picsum.photos/seed/${product.id}/250`} 
          alt={product.name}
        />
        <CardContent
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
          }}
        >
          <div>
            <Typography variant="h4">{product.title}</Typography>
            <Typography variant="h6">{product.fullDescription}</Typography>
            <Typography variant="h5">Pris: {product.price} kr</Typography>

            {/* Visar snittbetyg */}
            <Typography variant="h6">
              Snittbetyg: {averageRating}
              <Rating value={parseFloat(averageRating) || 0} precision={0.1} readOnly />
            </Typography>

            {/* Visar betygsfördelning */}
            <RatingBreakdown ratings={product.ratings} />

            {/* Användare kan sätta nytt betyg */}
            <Typography variant="h6" style={{ marginTop: "10px" }}>
              Sätt ditt betyg:
            </Typography>
            <Rating
              value={userRating}
              precision={1}
              onChange={(_, newValue) => handleRatingChange(newValue)}
            />
          </div>

          {/* Lägg till i varukorg */}
          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "20px" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => addToCart(product.id, 1)} // Test-användare med ID 1
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