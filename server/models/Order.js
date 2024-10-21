const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  userId: String,
  userName:String,
  cartId: String,
  cartItems: [
    {
      productId: String,
      title: String,
      image: String,
      price: String,
      quantity: String,
    },
  ],
  addressInfo: {
    addressId: String,
    address: String,
    city: String,
    pincode: String,
    phoneNumber: String,
    additionalNotes: String,
  },
  orderStatus: String,
  paymentMethod: String,
  paymentId: String,
  paymentStatus: String,
  totalAmount: String,
  orderDate: Date,
  orderUpdateDate: Date,
  payerId: String,
});

const Order = mongoose.model("Order", OrderSchema);
module.exports = Order;
