import express from "express";
import {
  addToCart,
  removeFromCart,
  fetchCart,
} from "../controllers/cartController.js";
import authMidlleware from "../middleware/auth.js";

const cartRouter = express.Router();

cartRouter.post("/add", authMidlleware, addToCart);
cartRouter.post("/remove", authMidlleware, removeFromCart);
cartRouter.post("/get", authMidlleware, fetchCart);

export default cartRouter;
