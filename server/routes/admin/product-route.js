const express = require("express");
const { handleImageUpload, addNewProduct, editProduct, deleteProduct, fetchProudcts } = require("../../controllers/admin/productContoller");
const { upload } = require("../../helpers/cloudinary");
const { authMiddleware } = require("../../controllers/auth/authController");
const adminRouter = express.Router();

adminRouter.post("/upload-image", upload.single("file"), handleImageUpload);
adminRouter.post("/add-product", authMiddleware, addNewProduct);
adminRouter.get("/get-all-product", authMiddleware, fetchProudcts);
adminRouter.put("/edit-product/:id", authMiddleware, editProduct);
adminRouter.delete("/delete-product/:id", authMiddleware, deleteProduct);
module.exports = { adminRouter }