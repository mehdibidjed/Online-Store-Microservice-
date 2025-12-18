import express from "express";
import {
  getAllProductsController as getAllProducts,
  getProductByIdController as getProductById,
  createProductController as createProduct,
  updateProductController as updateProduct,
  deleteProductController as deleteProduct,
} from "../controllers/productController.js";

const router = express.Router();
router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.post("/create-product", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);
export default router;
