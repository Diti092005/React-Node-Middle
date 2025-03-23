const mongoose = require("mongoose")
const userSchame = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        trim:true,
        lowercase:true
    },
    phone: {
        type: String
    },
    address: {
        type: String
    }
}, { timestamps: true })

module.exports = mongoose.model("User", userSchame)