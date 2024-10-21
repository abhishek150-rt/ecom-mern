const jwt = require("jsonwebtoken");
const { imageUploadUtils } = require("../../helpers/cloudinary");
const Product = require("../../models/Product");
const e = require("express");

const handleImageUpload = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded", status: 400 });
        }
        const base64File = Buffer.from(req.file.buffer).toLocaleString("base64");
        const url = "data:" + req.file.mimetype + ";base64," + base64File
        const result = await imageUploadUtils(url)
        if (result) {
            res.status(200).json({ message: "success", status: 200, result })
        }
        else return res.status(500).json({ message: "Something went wrong", status: 500 })
    } catch (error) {
        return res.status(500).json({ message: error.meesage || "something went wwrong", status: 500 })
    }
}

const addNewProduct = async (req, res) => {
    try {
        const token = req.cookies.token;

        // Verify the token
        const decoded = jwt.verify(token, "secretkey");

        // Optionally check user role
        if (decoded === null || decoded?.role !== 'admin') {
            return res.status(403).json({ message: "Access denied: Admins only.", status: 403 });
        }

        const { image, title, description, category, brand, price, salePrice, totalStock } = req.body;
        const newProduct = new Product({
            image,
            title,
            description,
            category,
            brand,
            price,
            salePrice,
            totalStock,
            user: decoded.id // Link product to the user who added it
        });

        const savedProduct = await newProduct.save();

        if (savedProduct) {
            return res.status(201).json({ message: "Product added successfully", status: 201 });
        } else {
            return res.status(500).json({ message: "Something went wrong", status: 500 });
        }

    } catch (error) {
        return res.status(500).json({ message: error.message || "Something went wrong", status: 500 });
    }
};

const fetchProudcts = async (req, res) => {
    try {
        const listOfProducts = await Product.find({})
        if (listOfProducts) {
            return res.status(200).json({ message: "Products Fetched Successfully.", status: 200, data: listOfProducts });
        }
        else res.status(500).json({ message: "Something went wrong", status: 500 });

    } catch (error) {
        return res.status(500).json({ message: error.meesage || "something went wwrong", status: 500 })
    }
}

const editProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { image, title, description, category, brand, price, salePrice, totalStock } = req.body;

        // Find the product by ID
        const uniqueProduct = await Product.findById(id);

        if (!uniqueProduct) {
            return res.status(404).json({ message: "Product does not exist.", status: 404 });
        }

        // Update the product fields if they are provided
        if (image) uniqueProduct.image = image;
        if (title) uniqueProduct.title = title;
        if (description) uniqueProduct.description = description;
        if (category) uniqueProduct.category = category;
        if (brand) uniqueProduct.brand = brand;
        if (price !== undefined) uniqueProduct.price = price; // Check for both null and 0
        if (salePrice !== undefined) uniqueProduct.salePrice = salePrice;
        if (totalStock !== undefined) uniqueProduct.totalStock = totalStock;

        // Save the updated product
        const updatedProduct = await uniqueProduct.save();

        return res.status(200).json({ message: "Product updated successfully", status: 200 });

    } catch (error) {
        return res.status(500).json({ message: error.message || "Something went wrong", status: 500 });
    }
};


const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        // Attempt to delete the product by ID
        const deletedProduct = await Product.findByIdAndDelete(id);

        // Check if the product was found and deleted
        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found.", status: 404 });
        }

        return res.status(200).json({ message: "Product deleted successfully", status: 200 });
    } catch (error) {
        return res.status(500).json({ message: error.message || "Something went wrong", status: 500 });
    }
};



module.exports = { handleImageUpload, addNewProduct, fetchProudcts, editProduct, deleteProduct }