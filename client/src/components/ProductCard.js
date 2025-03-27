import React from "react";
import { Card, CardMedia, CardContent, Typography, CardActions, Button, Rating } from "@mui/material";
import { Link } from "react-router-dom";
import { CalcAverageRating } from "./CalcAverageRating";

// Komponent för att visa varje enskild produkt
const ProductCard = ({ product }) => {
  // Beräkna genomsnittligt betyg
  const averageRating = CalcAverageRating(product.ratings);

  return (
    <Card>
      <CardMedia
        component="img"
        height="140"
        image={`https://picsum.photos/seed/${product.id}/250`}
        alt={product.title}
      />
      <CardContent>
        {/* Visar titel, kort beskrivning, pris och betyg */}
        <Typography variant="h6">{product.title}</Typography>
        <Typography variant="body2">{product.description}</Typography>
        <Typography variant="body2" color="textSecondary">Pris: {product.price} kr</Typography>
        
        {/* Visa snittbetyg */}
        <Typography variant="body2" color="textSecondary">Betyg: {averageRating}</Typography>
        <Rating value={parseFloat(averageRating)} precision={0.1} readOnly />
      </CardContent>
      <CardActions>
        {/* Knapp som leder till produktsidan för mer information */}
        <Button size="small" component={Link} to={`/product/${product.id}`} variant="contained">
          Visa detaljer
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
