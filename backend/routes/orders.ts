import express from "express";
import { ordersService } from "../services/orders";

const ordersRouter = express.Router();

ordersRouter.get("/orders", ordersService.getOrders);
ordersRouter.post("./orders", ordersService.postOrder);

export { ordersRouter };
