const express = require("express");

const { authMiddleware } = require("../../controllers/auth/authController");
const {
  getAllOrders,
  updateOrderStatus,
} = require("../../controllers/admin/orderController");
const adminOrderRouter = express.Router();

adminOrderRouter.get("/getAll", getAllOrders);
adminOrderRouter.post(
  "/update/:orderId/:status",
  authMiddleware,
  updateOrderStatus
);
module.exports = { adminOrderRouter };
