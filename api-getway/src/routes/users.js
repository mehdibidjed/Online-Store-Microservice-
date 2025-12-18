import express from "express";
import axios from "axios";
import authenticate from "../security/authenticate.js";
import authorize from "../security/authorize.js";
const router = express.Router();

router.get(
  "/get-user/:id",
  authenticate,
  authorize(["admin"]),
  async (req, res) => {
    try {
      const id = req.params.id;
      console.log("Fetching user with ID:", id);
      const response = await axios.get(
        `http://localhost:3001/users/get-profile/${req.params.id}`
      );
      res.status(200).json(response.data);
    } catch (error) {
      console.error("Error fetching user profile:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

export default router;
