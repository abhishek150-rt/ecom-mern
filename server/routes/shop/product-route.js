const express = require("express"); 
const { authMiddleware } = require("../../controllers/auth/authController");
const { fetchFilteredProducts, fetchProductDetails } = require("../../controllers/shop/productContoller");
const productRouter = express.Router();


productRouter.get("/get-all-product", authMiddleware, fetchFilteredProducts);
productRouter.get("/get-product-details/:id", authMiddleware, fetchProductDetails);
module.exports = { productRouter } 