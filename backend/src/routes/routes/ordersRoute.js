import express from "express";
import {createOrder, getOrders, getOrderId, updateOrder,updateOrderStatus,deleteOrder} from "../controller/ordersController.js"; // Ruta correcta a los controladores
const router = express.Router();

router.post("/order", createOrder);
router.get("/orders", getOrders);
router.get("/order/:id", getOrderId);
router.put("/order/:id", updateOrder);
router.put("/order/:id/status", updateOrderStatus);
router.delete("/order/:id", deleteOrder);

export default router;
