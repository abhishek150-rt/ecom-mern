require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { authRouter } = require("./routes/auth/auth-route");
const { adminRouter } = require("./routes/admin/product-route");
const { productRouter } = require("./routes/shop/product-route");
const { cartRouter } = require("./routes/shop/cart-route");
const { addressRouter } = require("./routes/shop/address-route");
const { orderRouter } = require("./routes/shop/order-route");
const { adminOrderRouter } = require("./routes/admin/order-route");
const { searchRouter } = require("./routes/shop/search-router");
const { reviewRouter } = require("./routes/shop/review-route");
const { sliderRouter } = require("./routes/admin/slider-router");

const app = express();
const port = process.env.PORT || 8000;

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/admin/products", adminRouter);
app.use("/api/admin/order", adminOrderRouter);
app.use("/api/admin/slider", sliderRouter);
app.use("/api/shop/products", productRouter);
app.use("/api/shop/cart", cartRouter);
app.use("/api/shop/address", addressRouter);
app.use("/api/shop/order", orderRouter);
app.use("/api/shop/search", searchRouter);
app.use("/api/shop/product/review", reviewRouter);

app.listen(port, () => {
  console.log(`Server in running on port number ${port}`);
});

mongoose
  .connect(process.env.MONGO_URL, {
    dbName: "e-com-db",
  })
  .then(() => console.log("DB Connected Successfully"))
  .catch((err) => console.log(err));
