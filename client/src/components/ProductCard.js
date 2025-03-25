import React from "react";
import { Card, CardMedia, CardContent, Typography, CardActions, Button, Rating } from "@mui/material";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  // Säkerställ att product.ratings alltid är en array
  const ratings = product.rating || [];
  const average = ratings.length > 0
    ? (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1)
    : 0;

  return (
    <Card>
      <CardMedia component="img" height="140" image={product.image} alt={product.name} />
      <CardContent>
        <Typography variant="h6">{product.title}</Typography>
        <Typography variant="body2">{product.description}</Typography>
        <Typography variant="body2" color="textSecondary">Pris: {product.price} kr</Typography>
        <Typography variant="body2" color="textSecondary">
          Betyg: {average}
        </Typography>
        <Rating value={parseFloat(average)} precision={0.1} readOnly />
      </CardContent>
      <CardActions>
        <Button size="small" component={Link} to={`/product/${product.id}`} variant="contained">
          Visa detaljer
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
