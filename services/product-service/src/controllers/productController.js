import {
  getAllProducts,
  getProductById,
  createProduct,
  deleteProduct,
  updateProduct,
} from "../models/productModel.js";

export async function createProductController(req, res) {
  try {
    const product = req.body;
    const newProduct = await createProduct(product);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}
export async function getAllProductsController(req, res) {
  try {
    const products = await getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}
export async function updateStockProduct(product_id, quantity) {
  try {
    const product = await getProductById(product_id);
    product.stock = product.stock - quantity;
    console.log("product stock ",product.stock)
    const updatedProduct = await updateProduct(product_id, product);
    console.log(updatedProduct);
  } catch (error) {
    console.log(error);
  }
}
export async function getProductByIdController(req, res) {
  try {
    const { id } = req.params;
    const product = await getProductById(id);
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function updateProductController(req, res) {
  try {
    const { id } = req.params;
    const productData = req.body;
    const updatedProduct = await updateProduct(id, productData);
    if (updatedProduct) {
      res.status(200).json(updatedProduct);
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}
export async function deleteProductController(req, res) {
  try {
    const { id } = req.params;
    const success = await deleteProduct(id);
    if (success) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}
