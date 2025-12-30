import express from "express";
import {
  createOrderController,
  deleteOrderController,
  updateOrderController,
  updateOrderStatusController,
  getAllOrdersController,
  getOrderByIdController,
} from "../controllers/order-controllers/orderControllers.js";
import authenticate from "../security/authenticate.js";
import authorize from "../security/authorize.js";

const router = express.Router();

router.post(
  "/create-order",
  authenticate,
  authorize(["admin", "user"]),
  createOrderController
);
router.get("/", authenticate, authorize(["admin"]), getAllOrdersController);
router.get("/:id", authenticate, authorize(["admin"]), getOrderByIdController);
router.put(
  "/update-order/:id",
  authenticate,
  authorize(["admin"]),
  updateOrderController
);
router.put(
  "/update-status/:id",
  authenticate,
  authorize(["admin"]),
  updateOrderStatusController
);
router.delete(
  "/delete-order/:id",
  authenticate,
  authorize(["admin"]),
  deleteOrderController
);

export default router;
