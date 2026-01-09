import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

import "dotenv/config.js";

//db connection
connectDB();

//app config
const app = express();

//middleware
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

//api endpoints
app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads"));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

app.get("/", (req, res) => {
  res.send("API Working");
});

app.listen(PORT, (req, res) => {
  console.log(`Server started on 127.0.0.1:${PORT}`);
});
