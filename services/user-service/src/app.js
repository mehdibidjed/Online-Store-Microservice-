import express from "express";
import userRoutes from "./routes/userRoutes.js";
import healthRoute from "./routes/healthRoute.js";

const app = express();
app.use(express.json());

app.use("/users", userRoutes);
app.use("/health", healthRoute);

export default app;
