import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import usersRoutes from "./routes/users.js";
const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/users",usersRoutes)
export default app;
