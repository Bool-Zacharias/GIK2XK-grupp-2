import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Typography } from "@mui/material";
import ProductForm from "./AddProductForm";
import { updateProduct, fetchProductById } from "../services/ProductService";

const EditProduct = ({setProducts}) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [productData, setProductData] = useState({
    title: "",
    price: "",
    image: "",
    description: "",
    fullDescription: "",
  });

  useEffect(() => {
      // Hämta den befintliga produkten från backend
      fetchProductById(id).then((data) => {
        if (data) {
          setProductData(data);
        }
      });
    }, [id]);

  const handleChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProduct(id, productData);
    setProducts(updated);
    navigate("/products");
  };

  return (
    <Container>
      <Typography variant="h4">Redigera Produkt</Typography>
      <ProductForm
        productData={productData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        submitLabel="Spara"
      />
    </Container>
  );
};

export default EditProduct;