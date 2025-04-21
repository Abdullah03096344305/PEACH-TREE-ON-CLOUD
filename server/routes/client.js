import express from "express";
import {
  createProduct,
  updateProduct,
  deleteProduct,
  getProducts,
  getCustomers,
  getTransactions,
  getGeography,
} from "../controllers/client.js";

const router = express.Router();

// Client routes
router.get("/products", getProducts);
router.get("/customers", getCustomers);
router.get("/transactions", getTransactions);
router.get("/geography", getGeography);
router.post("/products", createProduct); // Create a new product
router.put("/products/:id", updateProduct); // Update a product by ID
router.delete("/products/:id", deleteProduct); // Delete a product by ID

// Test route
router.get("/test", (req, res) => {
  res.send("Test route is working!");
});

export default router;
