import React from "react";
import {addToCart} from "../services/CartServices";
import { removeFromCart } from "../services/CartServices";
import { Container, Typography, List, ListItem, ListItemText, Button } from "@mui/material";

const CartPage = () => {
  const { cart, removeFromCart, totalPrice } = addToCart();

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Varukorg</Typography>
      {cart.length === 0 ? (
        <Typography variant="h6">Din varukorg är tom.</Typography>
      ) : (
        <>
          <List>
            {cart.map((product, index) => (
              <ListItem key={index}>
                <ListItemText primary={product.title} secondary={`Pris: ${product.price} kr`} />
                <Button variant="outlined" color="secondary" onClick={() => removeFromCart(product.id)}>
                  Ta bort
                </Button>
              </ListItem>
            ))}
          </List>
          <Typography variant="h5" style={{ marginTop: "20px" }}>
            Total: {totalPrice} kr
          </Typography>
        </>
      )}
    </Container>
  );
};

export default CartPage;
