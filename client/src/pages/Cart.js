import React from "react";
import { useCart } from "../context/CartContext";
import { Container, Typography, List, ListItem, ListItemText, Button } from "@mui/material";

const CartPage = () => {
  const { cart, removeFromCart, totalPrice } = useCart();

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Varukorg</Typography>
      {cart.length === 0 ? (
        <Typography variant="h6">Din varukorg är tom.</Typography>
      ) : (
        <>
          <List>
            {cart.map((item, index) => (
              <ListItem key={index}>
                <ListItemText primary={item.name} secondary={`Pris: ${item.price} kr`} />
                <Button variant="outlined" color="secondary" onClick={() => removeFromCart(item.id)}>
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
