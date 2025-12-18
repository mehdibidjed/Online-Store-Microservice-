import express from "express";
import cors from "cors";
import axios from "axios";
import authenticate from "./authr.js";
import authRoutes from "./routes/auth.js";
import dotenv from "dotenv";
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);

app.listen(3000,()=>{console.log("API Gateway running on port 3000")});