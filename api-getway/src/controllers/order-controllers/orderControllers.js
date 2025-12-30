import axios from "axios";

/**
 * Base URL of order-service
 * Use service name if Docker, localhost if local
 */
const ORDER_SERVICE_URL = "http://order-service:3001/orders";
// const ORDER_SERVICE_URL = "http://localhost:3001/orders";

/**
 * GET /orders
 */
export const getAllOrdersController = async (req, res) => {
  try {
    const response = await axios.get(ORDER_SERVICE_URL);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching orders",
      error: error.message,
    });
  }
};

/**
 * GET /orders/:id
 */
export const getOrderByIdController = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios.get(`${ORDER_SERVICE_URL}/${id}`);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching order",
      error: error.message,
    });
  }
};

/**
 * POST /orders/create-order
 */
export const createOrderController = async (req, res) => {
  try {
    const response = await axios.post(
      `${ORDER_SERVICE_URL}/create-order`,
      req.body
    );
    res.status(201).json(response.data);
  } catch (error) {
    res.status(500).json({
      message: "Error creating order",
      error: error.message,
    });
  }
};

/**
 * PUT /orders/update-order/:id
 */
export const updateOrderController = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios.put(
      `${ORDER_SERVICE_URL}/update-order/${id}`,
      req.body
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({
      message: "Error updating order",
      error: error.message,
    });
  }
};

/**
 * PUT /orders/update-status/:id
 */
export const updateOrderStatusController = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios.put(
      `${ORDER_SERVICE_URL}/update-status/${id}`,
      req.body
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({
      message: "Error updating order status",
      error: error.message,
    });
  }
};

/**
 * DELETE /orders/delete-order/:id
 */
export const deleteOrderController = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios.delete(
      `${ORDER_SERVICE_URL}/delete-order/${id}`
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({
      message: "Error deleting order",
      error: error.message,
    });
  }
};
