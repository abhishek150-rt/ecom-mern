const Product = require("../../models/Product");


const fetchFilteredProducts = async (req, res) => {
    try {
        const { category = [], brand = [], sortBy = "priceLowToHigh" } = req.query;

        // Initialize filters object
        let filters = {};

        // Check for brand filters
        if (brand.length > 0) {
            filters.brand = { $in: brand.split(",") };
        }

        // Check for category filters
        if (category.length > 0) {
            filters.category = { $in: category.split(",") };
        }

        // Set sorting options based on the sortBy parameter
        let sort = {};
        switch (sortBy) {
            case "priceLowToHigh":
                sort.price = 1;
                break;
            case "priceHighToLow":
                sort.price = -1;
                break;
            case "aToZ":
                sort.title = 1; // Assuming you want to sort by name alphabetically
                break;
            case "zToA":
                sort.title = -1; // Assuming you want to sort by name in reverse order
                break;
            default:
                sort.price = 1; // Default sorting option
                break;
        }

        // Fetch products with filters and sorting
        const listOfProducts = await Product.find(filters).sort(sort);

        if (listOfProducts) {
            return res.status(200).json({ message: "Products Fetched Successfully.", status: 200, data: listOfProducts });
        } else {
            return res.status(500).json({ message: "Something went wrong", status: 500 });
        }

    } catch (error) {
        return res.status(500).json({ message: error.message || "Something went wrong", status: 500 });
    }
}

const fetchProductDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id)

        if (product) {
            return res.status(200).json({ message: "Product details Fetched Successfully.", status: 200, data: product });
        } else {
            return res.status(404).json({ message: "Product Not Found", status: 404 });
        }

    } catch (error) {
        return res.status(500).json({ message: error.message || "Something went wrong", status: 500 });
    }
}


module.exports = { fetchFilteredProducts, fetchProductDetails }