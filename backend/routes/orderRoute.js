import express from "express";
import authMidlleware from "../middleware/auth.js";
import {
  listOrders,
  placeOrder,
  userOrder,
  updateStatus,
} from "../controllers/orderController.js";

const orderRouter = express.Router();

orderRouter.post("/place", authMidlleware, placeOrder);
orderRouter.post("/userorders", authMidlleware, userOrder);
orderRouter.post("/listorders", listOrders);
orderRouter.post("/status", updateStatus);

export default orderRouter;
