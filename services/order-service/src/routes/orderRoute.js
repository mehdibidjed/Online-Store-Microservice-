import express from "express";
import { createOrderController,deleteOrderController,updateOrderController,updateOrderStatusController,getAllOrdersController,getOrderByIdController } from '../controllers/ordersControllers.js';
const router = express.Router();


router.post('/create-order', createOrderController);
router.get('/', getAllOrdersController);
router.get('/:id', getOrderByIdController);
router.put('/update-status/:id', updateOrderStatusController);
router.put('/update-order/:id', updateOrderController);
router.delete('/delete-order/:id', deleteOrderController);

export default router;
