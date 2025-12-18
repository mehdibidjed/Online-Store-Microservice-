import express from "express";

const router = express.Router();

router.get("/get-health", (req, res) => {
  res.status(200).json({ status: "Product Service is healthy" });
});
export default router;
