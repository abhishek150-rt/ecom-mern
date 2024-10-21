var mongoose = require('mongoose');

const AddressSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        required: true, 
        ref: 'User'
    },
    address: { 
        type: String, 
        required: true 
    },
    city: { 
        type: String, 
        required: true 
    },
    pincode: { 
        type: String, 
        required: true, 
        match: /^[0-9]{6}$/
    },
    phoneNumber: { 
        type: String, 
        required: true, 
        match: /^\+?[0-9]{10,15}$/ 
    },
    additionalNotes: { 
        type: String 
    }
}, { timestamps: true });

 

const Address = mongoose.model("Address", AddressSchema);
module.exports = Address;
