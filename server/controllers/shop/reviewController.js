const Order = require("../../models/Order");
const Product = require("../../models/Product");
const { Review } = require("../../models/Review");

const createProductReview = async (req, res) => {
  try {
    const { productId, userId, userName, reviewMessage, reviewValue } = req.body;

    const order = await Order.findOne({
      userId,
      "cartItems.productId": productId,
      orderStatus: "confirmed",
    });

    if (!order) {
      return res.status(403).json({
        message: "You need to purchase the product to review it",
        status: 403,
      });
    }

    const existingReview = await Review.findOne({ productId, userId });
    if (existingReview) {
      return res.status(400).json({
        message: "You have already reviewed this product",
        status: 400,
      });
    }

    const newReview = new Review({
      productId,
      userId,
      userName,
      reviewMessage,
      reviewValue,
    });
    await newReview.save();

    // Calculate average review value
    const reviews = await Review.find({ productId });
    const totalReviewLength = reviews.length;
    const totalReviewValue = reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0);
    const averageReview = totalReviewLength ? totalReviewValue / totalReviewLength : 0;

    // Update product's average review
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { averageReview },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(500).json({
        message: "Failed to update the product's average review",
        status: 500,
      });
    }

    return res.status(200).json({
      message: "Review submitted successfully",
      status: 200,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Something went wrong",
      status: 500,
    });
  }
};

module.exports = { createProductReview };


const getProductReview = async (req, res) => {
  try {
    const { productId } = req.params;

    const reviews = await Review.find({ productId });

    return res.status(200).json({
      message: "Reviews retrieved successfully",
      status: 200,
      data: reviews,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Something went wrong",
      status: 500,
    });
  }
};

module.exports = { createProductReview, getProductReview };
