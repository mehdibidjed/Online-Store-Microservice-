import express from 'express';
import productRoutes from './routes/productRoutes.js';
import healthRoute from './routes/healthRoute.js';
const app = express();
app.use(express.json());

app.use('/products', productRoutes);
app.use('/health', healthRoute);
export default app;