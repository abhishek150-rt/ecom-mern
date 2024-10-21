const express = require("express");
const { authMiddleware } = require("../../controllers/auth/authController");
const { addToCart, updateCartItemQuantity, fetchCartItems, deleteCartItem } = require("../../controllers/shop/cartController");
const cartRouter = express.Router();

cartRouter.get("/fetchCart/:userId", authMiddleware, fetchCartItems);
cartRouter.post("/addToCart", authMiddleware, addToCart);
cartRouter.put("/updateCart", authMiddleware, updateCartItemQuantity);
cartRouter.delete("/deleteCart/:userId/:productId", authMiddleware, deleteCartItem);

module.exports = { cartRouter } 