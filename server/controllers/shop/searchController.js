const Product = require("../../models/Product");

const searchProducts = async (req, res) => {
  try {
    const { keyword } = req.params;
    if (!keyword || typeof keyword !== "string") {
      return res
        .status(400)
        .json({
          message: "Keyword is required and must be a string",
          status: 400,
        });
    }

    const regex = new RegExp(keyword, "i");
    const createSearchQuery = {
      $or: [{ title: regex }, { description: regex }, { brand: regex }],
    };

    const results = await Product.find(createSearchQuery);
    res.status(200).json({
      state: 200,
      message: "Products fetched successfully",
      data: results,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || "Something went wrong", status: 500 });
  }
};

module.exports = { searchProducts };
