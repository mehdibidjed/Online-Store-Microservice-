import express from "express";
import axios from "axios";
import authenticate from "../security/authenticate.js";
import authorize from "../security/authorize.js";
import { getUserProfile } from "../controllers/user-controllers/userController.js";
const router = express.Router();

router.get("/get-user/:id", authenticate, authorize(["admin"]), getUserProfile);

export default router;
