import express from "express";
import axios from "axios";
import authenticate from "../security/authenticate.js";
import authorize from "../security/authorize.js";
import {
  getAllProductsController,
  getProductByIdController,
  createProductController,
  updateProductController,
  deleteProductController,
} from "../controllers/product-controllers/productControllers.js";
const router = express.Router();

router.get(
  "/",
  authenticate,
  authorize(["admin", "user"]),
  getAllProductsController
);
router.get(
  "/:id",
  authenticate,
  authorize(["admin", "user"]),
  getProductByIdController
);
router.post(
  "/create-product",
  authenticate,
  authorize(["admin"]),
  createProductController
);
router.put(
  "update-product/:id",
  authenticate,
  authorize(["admin"]),
  updateProductController
);
router.delete(
  "delete-product/:id",
  authenticate,
  authorize(["admin"]),
  deleteProductController
);
export default router;
