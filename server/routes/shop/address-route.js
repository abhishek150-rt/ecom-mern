const express = require("express");
const { authMiddleware } = require("../../controllers/auth/authController");
const { addAddress, editAddress, deleteAddress, fetchAllAddress } = require("../../controllers/shop/addressController");
const addressRouter = express.Router();


addressRouter.post("/add", authMiddleware, addAddress);
addressRouter.put("/edit/:userId/:addressId", authMiddleware, editAddress);
addressRouter.delete("/delete/:userId/:addressId", authMiddleware, deleteAddress);
addressRouter.get("/getAll/:userId", authMiddleware, fetchAllAddress);
module.exports = { addressRouter } 