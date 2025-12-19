import pool from "../config/database.js";

export async function createOrder(order) {
  const { user_id, product_id, quantity, total_price } = order;
  try {
    const result = await pool.query(
      `
            INSERT INTO orders (user_id, product_id, quantity, total_price)
            VALUES ($1, $2, $3, $4)
            RETURNING *
            `,
      [user_id, product_id, quantity, total_price]
    );

    return result.rows[0];
  } catch (error) {
    console.error("Error creating order:", error);
  }
}
export const getAllOrders = async () => {
  try {
    const results = await pool.querey("SELECT * FROM orders");
    return results.rows;
  } catch (error) {
    console.error("Error fetching orders:", error);
  }
};
export const getOrderById = async (id) => {
  try {
    const result = await pool.query("SELECT * FROM orders WHERE id = $1", [id]);
    return result.rows[0];
  } catch (error) {
    console.error("Error fetching order by ID:", error);
  }
};
export const updateOrderStatus = async (id, status) => {
  try {
    const result = await pool.query(
      "UPDATE orders SET status = $1 WHERE id = $2 RETURNING *",
      [status, id]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error updating order status:", error);
  }
};
export const updateOrder = async (id, order) => {
  try {
    const { user_id, product_id, quantity, total_price } = order;
    const result = await pool.query(
      `
      UPDATE orders
      SET user_id = $1, product_id = $2, quantity = $3, total_price = $4
      WHERE id = $5
      RETURNING *
      `,
      [user_id, product_id, quantity, total_price, id]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error updating order:", error);
  }
};
export const deleteOrder = async (id) => {
  try {
    await pool.query("DELETE FROM orders WHERE id = $1", [id]);
    return true;
  } catch (error) {
    console.error("Error deleting order:", error);
  }
};
