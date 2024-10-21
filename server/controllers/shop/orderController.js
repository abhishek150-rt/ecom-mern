const { paypal } = require("../../helpers/payment");
const Cart = require("../../models/Cart");
const Order = require("../../models/Order");
const Product = require("../../models/Product");

const createOrder = async (req, res) => {
  try {
    const {
      cartId,
      userId,
      userName,
      cartItems,
      addressInfo,
      orderStatus,
      paymentMethod,
      paymentId,
      paymentStatus,
      totalAmount,
      orderDate,
      orderUpdateDate,
      payerId,
    } = req.body;

    const create_payment_json = {
      intent: "sale",
      payer: {
        payment_method: "paypal",
      },
      redirect_urls: {
        return_url: `${process.env.CLIENT_URL}/shopping/paymentReturn`,
        cancel_url: `${process.env.CLIENT_URL}/shopping/paymentCancel`,
      },
      transactions: [
        {
          item_list: {
            items: cartItems.map((item) => ({
              name: item.title,
              sku: item.productId,
              price: item.price.toFixed(2),
              currency: "USD",
              quantity: item.quantity,
            })),
          },
          amount: {
            currency: "USD",
            total: totalAmount.toFixed(2),
          },
          description: "Your purchase description here", // You can add a description
        },
      ],
    };

    paypal.payment.create(create_payment_json, async (error, paymentInfo) => {
      if (error) {
        return res
          .status(500)
          .json({ message: error || "Something went wrong", status: 500 });
      } else {
        const newLyCreatedOrder = new Order({
          cartId,
          userId,
          userName,
          cartItems,
          addressInfo,
          orderStatus: "confirmed",
          paymentMethod,
          paymentId: "12345",
          paymentStatus: "paid",
          totalAmount,
          orderDate,
          orderUpdateDate,
          payerId: "1234",
        });
        await newLyCreatedOrder.save();
        const approvalUrl = paymentInfo.links.find(
          (link) => link.rel === "approval_url"
        ).href;
        const products = await Product.find();
        const productMap = new Map(
          products.map((product) => [product._id.toString(), product])
        );

        console.log("cartItems", cartItems);

        const updatePromises = cartItems.map(async (item) => {
          const product = productMap.get(item.productId.toString());
          if (product) {
            product.totalStock -= item.quantity;
            return product.save(); // Collect promises for batch processing
          }
        });

        await Promise.all(updatePromises);

        await Cart.findByIdAndDelete(cartId);

        return res.status(201).json({
          message: "",
          status: 201,
          approvalUrl,
          orderId: newLyCreatedOrder._id,
        });
      }
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || "Something went wrong", status: 500 });
  }
};

const capturePayment = async (req, res) => {
  try {
    const { paymentId, payerId, orderId } = req.body;
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order Not Found", status: 404 });
    }
    order.paymentStatus = "paid";
    order.orderStatus = "confirmed";
    order.paymentId = paymentId;
    order.payerId = payerId;

    await Cart.findByIdAndDelete(order.cartId);

    await order.save();

    res
      .status(200)
      .json({ message: "Order Confirmed", status: 200, data: order });
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || "Something went wrong", status: 500 });
  }
};

const getAllOrderByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const orders = await Order.find({ userId });
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

const getOrderDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);
    if (order === null) {
      return res.status(400).json({
        message: "No Orders found",
        status: 400,
      });
    } else {
      return res.status(200).json({
        message: "Success",
        status: 200,
        order,
      });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || "Something went wrong", status: 500 });
  }
};

module.exports = {
  createOrder,
  capturePayment,
  getAllOrderByUser,
  getOrderDetails,
};
