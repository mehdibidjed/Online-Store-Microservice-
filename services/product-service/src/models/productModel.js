import pool from "../config/database.js";

export async function createProduct(product) {
  const { name, description, price, stock } = product;
  try {
    const result = await pool.query(
      `
          INSERT INTO products (name, description, price, stock)
          VALUES ($1, $2, $3, $4)
          RETURNING *
          `,
      [name, description, price, stock]
    );

    return result.rows[0];
  } catch (error) {
    console.error("Error creating product:", error);
  }
}

export async function getAllProducts() {
  try {
    const result = await pool.query("SELECT * FROM products");
    return result.rows;
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}
export async function getProductById(id) {
  try {
    const result = await pool.query("SELECT * FROM products WHERE id = $1", [
      id,
    ]);
    return result.rows[0];
  } catch (error) {
    console.error("Error fetching product by ID:", error);
  }
}
export async function updateStockProduct(id,quantity){
  try {
        const result=await pool.query("SELECT * FROM ")    
  } catch (error) {
    
  }
}
export async function updateProduct(id, product) {
  const { name, description, price, stock } = product;

  try {
    const result = await pool.query(
      `
      UPDATE products
      SET name = $1, description = $2, price = $3, stock = $4
      WHERE id = $5
      RETURNING *
      `,
      [name, description, price, stock, id]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error updating product:", error);
  }
}
export async function deleteProduct(id) {
  try {
    await pool.query("DELETE FROM products WHERE id = $1", [id]);
    return true;
  } catch (error) {
    console.error("Error deleting product:", error);
    return false;
  }
}
