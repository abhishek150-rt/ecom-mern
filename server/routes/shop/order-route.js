const express = require("express");
const { authMiddleware } = require("../../controllers/auth/authController");
const {
  createOrder,
  capturePayment,
  getAllOrderByUser,
  getOrderDetails,
} = require("../../controllers/shop/orderController");
const orderRouter = express.Router();

orderRouter.post("/create", authMiddleware, createOrder);
orderRouter.get("/getAll/:userId",authMiddleware, getAllOrderByUser);
orderRouter.get("/details/:id", authMiddleware, getOrderDetails);
orderRouter.get("/capture", authMiddleware, capturePayment);
module.exports = { orderRouter };
