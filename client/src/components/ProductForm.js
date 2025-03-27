import React from "react";
import { TextField, Button } from "@mui/material";

const ProductForm = ({ productData, onChange, onSubmit, submitLabel }) => {
  return (
    <form onSubmit={onSubmit}>
      <TextField
        label="Titel"
        name="title"
        value={productData.title}
        onChange={onChange}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Pris"
        name="price"
        type="number"
        value={productData.price}
        onChange={onChange}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Bild-URL"
        name="image"
        value={productData.image}
        onChange={onChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Kort beskrivning"
        name="description"
        value={productData.description}
        onChange={onChange}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Full beskrivning"
        name="fullDescription"
        value={productData.fullDescription}
        onChange={onChange}
        fullWidth
        margin="normal"
        required
      />
      <Button type="submit" variant="contained" color="primary">
        {submitLabel}
      </Button>
    </form>
  );
};

export default ProductForm;