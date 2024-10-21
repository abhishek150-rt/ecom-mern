const { default: mongoose } = require("mongoose");
const Cart = require("../../models/Cart");
const Product = require("../../models/Product")

async function addToCart(req, res) {
    try {
        const { userId, productId, quantity } = req.body;

        if (!userId || !productId || quantity <= 0) {
            return res.status(400).json({ message: "Bad Request", status: 400 });
        }

        const product = await Product.findById(productId);
        if (!product || product.totalStock === 0) {
            return res.status(400).json({ message: product ? "Product Out Of Stock" : "Product does not exist", status: 400 });
        }

        let cart = await Cart.findOneAndUpdate(
            { userId },
            { $setOnInsert: { items: [] } },
            { new: true, upsert: true }
        );

        const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
        if (itemIndex === -1) {
            cart.items.push({ productId, quantity });
        } else {
            cart.items[itemIndex].quantity += quantity;
        }

        await cart.save();
        return res.status(200).json({ message: "Product added to cart", cart, status: 200 });
    } catch (error) {
        return res.status(500).json({ message: error.message || "Something went wrong", status: 500 });
    }
}

async function fetchCartItems(req, res) {
    try {
        const { userId } = req.params;
        if (!userId) return res.status(400).json({ message: "Bad Request", status: 400 });

        const cart = await Cart.findOne({ userId }).populate({
            path: "items.productId",
            select: "image title price salePrice"
        });

        if (!cart) return res.status(404).json({ message: "Cart Not Available", status: 404 });

        const availableItems = cart.items.filter(item => item.productId);
        cart.items = availableItems;
        await cart.save();

       

        return res.status(200).json({ cart, message: "success", status: 200 });
    } catch (error) {
        return res.status(500).json({ message: error.message || "Something went wrong", status: 500 });
    }
}

async function updateCartItemQuantity(req, res) {
    try {
        const { userId, productId, quantity } = req.body;

        if (!userId || !productId || quantity < 0) {
            return res.status(400).json({ message: "Bad Request: Invalid input", status: 400 });
        }

        const cart = await Cart.findOne({ userId: new mongoose.Types.ObjectId(userId) });
        if (!cart) return res.status(404).json({ message: "Cart not found", status: 404 });
        const itemIndex = cart.items.findIndex(item => item.productId.toString() == productId);
        if (itemIndex === -1) return res.status(404).json({ message: "Item not found in cart", status: 404 });

        if (quantity === 0) {
            cart.items.splice(itemIndex, 1);
        } else {
            cart.items[itemIndex].quantity = quantity;
        }

        await cart.save();
        return res.status(200).json({ message: "Cart updated successfully", cart, status: 200 });
    } catch (error) {
        return res.status(500).json({ message: error.message || "Something went wrong", status: 500 });
    }
}

async function deleteCartItem(req, res) {
    try {
        const { userId, productId } = req.params;

        if (!userId || !productId) {
            return res.status(400).json({ message: "Bad Request: userId and productId are required", status: 400 });
        }

        const cart = await Cart.findOne({ userId });
        if (!cart) return res.status(404).json({ message: "Cart not found", status: 404 });

        const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
        if (itemIndex === -1) return res.status(404).json({ message: "Item not found in cart", status: 404 });

        cart.items.splice(itemIndex, 1);
        await cart.save();

        return res.status(200).json({ message: "Item removed from cart successfully", cart, status: 200 });
    } catch (error) {
        return res.status(500).json({ message: error.message || "Something went wrong", status: 500 });
    }
}

module.exports = { addToCart, fetchCartItems, updateCartItemQuantity, deleteCartItem };
