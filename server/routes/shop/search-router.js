const express = require("express"); 
const { authMiddleware } = require("../../controllers/auth/authController");
const { searchProducts } = require("../../controllers/shop/searchController");
const searchRouter = express.Router();


searchRouter.get("/:keyword", authMiddleware, searchProducts);
module.exports = { searchRouter } 