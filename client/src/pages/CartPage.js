import React, { useState, useEffect } from "react";
import { fetchCartByUser } from "../services/CartServices";
import { Container, Typography, List, ListItem, ListItemText } from "@mui/material";

const CartPage = ({ userId }) => {
  const [cart, setCart] = useState(null); // Innehåller produkter i varukorgen
  const [loading, setLoading] = useState(true); // Laddningsstatus
  const [totalPrice, setTotalPrice] = useState(0); // Totalsumma

  useEffect(() => {
    // Hämtar varukorgen när komponenten laddas eller userId ändras
    const loadCart = async () => {
      const cartData = await fetchCartByUser(userId);
      if (cartData && cartData.products) {
        setCart(cartData.products);
        const total = cartData.products.reduce(
          (sum, product) => sum + product.price * product.amount,
          0
        );
        setTotalPrice(total);
      } else {
        setCart([]);
        setTotalPrice(0);
      }
      setLoading(false);
    };
    if (userId) loadCart();
  }, [userId]);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Varukorg</Typography>
      {loading ? (
        <Typography variant="h6">Laddar varukorg...</Typography>
      ) : cart.length === 0 ? (
        <Typography variant="h6">Din varukorg är tom.</Typography>
      ) : (
        <>
          {/* Lista med produkter i varukorgen */}
          <List>
            {cart.map((product, index) => (
              <ListItem key={index}>
                <ListItemText primary={product.title || product.description} secondary={`Pris: ${product.price} kr, Antal: ${product.amount}`} />
              </ListItem>
            ))}
          </List>
          {/* Visar totalsumma */}
          <Typography variant="h5" style={{ marginTop: "20px" }}>
            Total: {totalPrice} kr
          </Typography>
        </>
      )}
    </Container>
  );
};

export default CartPage;