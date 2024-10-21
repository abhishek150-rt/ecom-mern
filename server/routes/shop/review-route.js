const express = require("express");
const { authMiddleware } = require("../../controllers/auth/authController");
const {
  createProductReview,
  getProductReview,
} = require("../../controllers/shop/reviewController");
const reviewRouter = express.Router();

reviewRouter.post("/save", authMiddleware, createProductReview);
reviewRouter.get("/get/:productId", authMiddleware, getProductReview);
module.exports = { reviewRouter };
