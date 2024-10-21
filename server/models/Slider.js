const mongoose = require("mongoose");

const SliderSchema = new mongoose.Schema(
  {
    image: String,
  },
  { timestamps: true }
);

const Slider = mongoose.model("Slider", SliderSchema);
module.exports = { Slider };
