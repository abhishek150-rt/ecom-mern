const { default: mongoose, Mongoose } = require("mongoose");
const Address = require("../../models/Address");

const addAddress = async (req, res) => {
    try {
        const { userId, address, city, pincode, phoneNumber, additionalNotes } = req.body

        if (!userId || !address || !city || !pincode || !phoneNumber) {
            return res.status(400).json({ message: "All fields except additionalNotes are required.", status: 400 });
        }

        const newAddress = new Address({
            userId, address, city, pincode, phoneNumber, additionalNotes
        })
        await newAddress.save()
        return res.status(201).json({ message: "Address Added Successfully", status: 201 })

    } catch (error) {
        return res.status(500).json({ message: error.message || "Something went wrong", status: 500 });
    }
}

const fetchAllAddress = async (req, res) => {
    try {
        const { userId } = req.params;

        if (!userId) {
            return res.status(400).json({ message: "User ID is required.", status: 400 });
        }
        const userAddresses = await Address.find({ userId });

        if (userAddresses.length === 0) {
            return res.status(404).json({ message: "No addresses found for this user.", status: 404 });
        }

        return res.status(200).json({
            message: "Addresses fetched successfully",
            status: 200,
            userAddresses
        });

    } catch (error) {
        return res.status(500).json({ message: error.message || "Something went wrong", status: 500 });
    }
};
const editAddress = async (req, res) => {
    try {
        const { userId, addressId } = req.params;

        // Validate input
        if (!userId || !addressId) {
            return res.status(400).json({ message: "User ID and Address ID are required.", status: 400 });
        }

        // Find the specific address directly
        const selectedAddress = await Address.findOne({ _id: addressId, userId });

        if (!selectedAddress) {
            return res.status(404).json({
                message: "Address not found",
                status: 404,
            });
        }

        // Update the address
        const updatedAddress = await Address.findByIdAndUpdate(addressId, req.body, { new: true });

        return res.status(200).json({
            message: "Address updated successfully",
            status: 200,
            updatedAddress
        });
    } catch (error) {
        return res.status(500).json({ message: error.message || "Something went wrong", status: 500 });
    }
}

const deleteAddress = async (req, res) => {
    try {
        const { userId, addressId } = req.params;

        // Validate input
        if (!userId || !addressId) {
            return res.status(400).json({ message: "User ID and Address ID are required.", status: 400 });
        }

        // Find the specific address directly
        const selectedAddress = await Address.findOne({ _id: addressId, userId });

        if (!selectedAddress) {
            return res.status(404).json({
                message: "Address not found",
                status: 404,
            });
        }

        // Delete the address
        await Address.findByIdAndDelete(addressId);

        return res.status(200).json({
            message: "Address deleted successfully",
            status: 200,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message || "Something went wrong", status: 500 });
    }
}



module.exports = { addAddress, editAddress, deleteAddress, fetchAllAddress }