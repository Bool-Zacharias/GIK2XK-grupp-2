import React from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

// Startsida med välkomsttext och navigering till produkter/varukorg
const Home = () => {
  return (
    <Container maxWidth="lg" style={{ textAlign: "center", paddingTop: "50px" }}>
      {/* Välkomnande huvudrubrik */}
      <Typography variant="h2" gutterBottom style={{ fontWeight: "bold", color: "#00448c" }}>
        Välkommen till Min Webbutik!
      </Typography>
      
      {/* Kort beskrivning av sidan */}
      <Typography variant="h5" color="textSecondary" paragraph>
        Här hittar du de senaste teknikprodukterna, gaming-tillbehören och smarta lösningarna för ditt digitala liv.
        Vi erbjuder hög kvalitet, snabba leveranser och fantastiska priser!
      </Typography>

      {/* Navigeringsknappar till produkter och varukorg */}
      <Box mt={4} display="flex" justifyContent="center" gap={2}>
        <Button variant="contained" color="primary" size="large" component={Link} to="/products">
          Utforska Produkter
        </Button>
        <Button variant="outlined" color="primary" size="large" component={Link} to="/cart">
          Gå till Varukorg
        </Button>
      </Box>

      {/* Fördelar med att handla hos oss */}
      <Box mt={6} p={4} style={{ backgroundColor: "#ffffff", borderRadius: "8px", boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.67)" }}>
        <Typography variant="h4" gutterBottom style={{ color: "#00448c" }}>
          Varför Handla Hos Oss?
        </Typography>
        <Typography variant="body1" color="textSecondary">
          ✔️ Brett utbud av de senaste produkterna <br />
          ✔️ Fri frakt vid beställningar över 500 kr <br />
          ✔️ Trygg och säker betalning <br />
          ✔️ Snabba leveranser
        </Typography>
      </Box>
    </Container>
  );
};

export default Home;