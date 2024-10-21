const { Slider } = require("../../models/Slider");

const addSliderImage = async (req, res) => {
  try {
    const { image } = req.body;
    if (!image) {
      return res
        .status(400)
        .json({ message: "Image is required", status: 400 });
    }

    const slide = new Slider({ image });
    await slide.save();
    return res
      .status(201)
      .json({ message: "Image added successfully", status: 201 });
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || "Something went wrong", status: 500 });
  }
};

const fetchSliderImages = async (req, res) => {
  try {
    const images = await Slider.find();
    res.status(200).json({ message: "success", status: 200, data: images });
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || "Something went wrong", status: 500 });
  }
};

module.exports = { addSliderImage, fetchSliderImages };
