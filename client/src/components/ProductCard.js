//Visar produktens bild, namn, pris och betyg
//Knappen leder till ProductDetails med produktens ID

import React from "react";
import { Card, CardMedia, CardContent, Typography, CardActions, Button, Rating } from "@mui/material";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const average = product.ratings.length > 0
    ? (product.ratings.reduce((a, b) => a + b, 0) / product.ratings.length).toFixed(1)
    : 0;

  return (
    <Card>
      <CardMedia component="img" height="140" image={product.image} alt={product.name} />
      <CardContent>
        <Typography variant="h6">{product.name}</Typography>
        <Typography variant="body2">{product.shortDescription}</Typography>
        <Typography variant="body2" color="textSecondary">Pris: {product.price} kr</Typography>
        <Typography variant="body2" color="textSecondary">
          Betyg: {average}
        </Typography>
        <Rating value={parseFloat(average)} precision={0.1} readOnly />
      </CardContent>
      <CardActions>
        <Button size="small" component={Link} to={`/products/${product.id}`} variant="contained">
          Visa detaljer
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;