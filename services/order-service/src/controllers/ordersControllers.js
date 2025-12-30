import { publishEvent } from "../messaging/publisher.js";
import {
  createOrder,
  deleteOrder,
  updateOrderStatus,
  getAllOrders,
  getOrderById,
  updateOrder,
} from "../models/orderModel.js";

export const createOrderController = async (req, res) => {
  const orderData = req.body;
  console.log(orderData)
  try {
    const newOrder = await createOrder(orderData);
    await publishEvent("order.created", {
      product_id: newOrder.product_id,
      quantity:newOrder.quantity
    });
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ error: "Failed to create order" });
  }
};
export const getAllOrdersController = async (req, res) => {
  try {
    const orders = await getAllOrders();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch orders" });
  }
};
export const getOrderByIdController = async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await getOrderById(orderId);
    if (order) {
      res.status(200).json(order);
    } else {
      res.status(404).json({ error: "Order not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch order by ID" });
  }
};
export const updateOrderStatusController = async (req, res) => {
  try {
    orderId = req.params.id;
    const { status } = req.body;
    const updatedOrder = await updateOrderStatus(orderId, status);
    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error("Error updating order status:", error);
  }
};
export const updateOrderController = async (req, res) => {
  try {
    const orderId = req.params.id;
    const orderData = req.body;
    const updatedOrder = await updateOrder(orderId, orderData);
    res.status(200).json(updatedOrder);
  } catch (error) {
    console.log("Error updating order:", error);
  }
};
export const deleteOrderController = async (req, res) => {
  const orderId = req.params.id;
  const deletedOrder = await deleteOrder(orderId);
  if (deletedOrder) {
    res.status(200).json({ message: "Order deleted successfully" });
  } else {
    res.status(500).json({ error: "Failed to delete order" });
  }
};
