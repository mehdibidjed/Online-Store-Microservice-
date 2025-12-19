import express from "express";
import healthRoute from "./routes/healthRoute.js";
import orderRoute from "./routes/orderRoute.js";
const app = express();

app.use(express.json());

app.use("/health", healthRoute);
app.use("/orders", orderRoute);
export default app;
