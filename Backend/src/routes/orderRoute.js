import express from 'express';
import { placeOrder,verifyOrder,userOrders, listOrders,updateStatus } from '../controllers/orderController.js';
import authMiddleware from '../middlewares/auth.js';
import canteenAuth from '../middlewares/adminAuth.js'
const orderRouter = express.Router();

orderRouter.post('/place',authMiddleware,placeOrder);
orderRouter.post('/verify',verifyOrder);
orderRouter.post('/userOrders',authMiddleware,userOrders);
orderRouter.get('/list',canteenAuth,listOrders);
orderRouter.post('/status',updateStatus);

export default orderRouter;