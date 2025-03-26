import React from "react";
import { Card, CardMedia, CardContent, Typography, CardActions, Button, Rating } from "@mui/material";
import { Link } from "react-router-dom";

// Komponent för att visa varje enskild produkt i en kortvy
const ProductCard = ({ product }) => {
  // Säkerställ att product.ratings alltid är en array
  const ratings = product.ratings || [];

  // Räknar ut genomsnittsbetyg från alla betyg
  const average = ratings.length > 0
    ? (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1)
    : 0;

  return (
    <Card>
      {/* 
        Visar produktens bild om en giltig bild-URL finns.
        Annars visas en platsbild från picsum.photos som varierar beroende på produktens id.
        - "&&" ser till att värdet inte är null/undefined
        - "trim() !== ''" ser till att strängen inte bara innehåller mellanslag
        - Ternary-operatorn ( ? : ) väljer mellan två alternativ
      */}
      <CardMedia
        component="img"
        height="140"
        image={product.image && product.image.trim() !== "" ? product.image : `https://picsum.photos/seed/${product.id}/250`}
        alt={product.title}
      />
      <CardContent>
        {/* Visar titel, kort beskrivning, pris och betyg */}
        <Typography variant="h6">{product.title}</Typography>
        <Typography variant="body2">{product.description}</Typography>
        <Typography variant="body2" color="textSecondary">Pris: {product.price} kr</Typography>
        <Typography variant="body2" color="textSecondary">Betyg: {average}</Typography>
        <Rating value={parseFloat(average)} precision={0.1} readOnly />
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