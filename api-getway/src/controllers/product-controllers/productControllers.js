import axios from "axios";
import getServiceAddress from "../../consum/registery.js";

export const getAllProductsController = async (req, res) => {
  try {
    const response = await axios.get("http://localhost:3002/products");
    res.status(200).json(response.data);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching products", error: error.message });
  }
};
export const getProductByIdController = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios.get(`http://localhost:3002/products/${id}`);
    res.status(200).json(response.data);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching product", error: error.message });
  }
};
export const createProductController = async (req, res) => {
  const productData = req.body;
  try {
    const response = await axios.post(
      `${await getServiceAddress("product-service")}/products/create-product`,
      productData
    );
    res.status(201).json(response.data);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating product", error: error.message });
  }
};
export const updateProductController = async (req, res) => {
  const { id } = req.params;
  const productData = req.body;
  try {
    const response = await axios.put(
      `http://product-service:3002/products/update-product${id}`,
      productData
    );
    res.status(200).json(response.data);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating product", error: error.message });
  }
};
export const deleteProductController = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios.delete(
      `http://product-service:3002/products/delete-product/${id}`
    );
    res.status(200).json(response.data);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting product", error: error.message });
  }
};
