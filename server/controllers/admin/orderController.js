const Order = require("../../models/Order");

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    if (orders.length === 0) {
      return res.status(400).json({
        message: "No Orders found",
        status: 400,
      });
    } else {
      return res.status(200).json({
        message: "Success",
        status: 200,
        orders,
      });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || "Something went wrong", status: 500 });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { orderId, status } = req.params;
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(400).json({
        message: "No Orders found",
        status: 400,
      });
    } else
      await Order.findByIdAndUpdate(
        orderId,
        { orderStatus: status },
        { new: true }
      );
    return res
      .status(200)
      .json({ status: 200, message: "Order Updated Successfully." });
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || "Something went wrong", status: 500 });
  }
};

module.exports = { getAllOrders, updateOrderStatus };
