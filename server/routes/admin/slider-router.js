const express = require("express");

const { authMiddleware } = require("../../controllers/auth/authController");
const { addSliderImage, fetchSliderImages } = require("../../controllers/admin/sliderController");

const sliderRouter = express.Router();

sliderRouter.post("/upload", authMiddleware, addSliderImage);
sliderRouter.get("/getAll", authMiddleware, fetchSliderImages);

module.exports = { sliderRouter };
