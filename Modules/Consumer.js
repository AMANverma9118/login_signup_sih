const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
        unique: false
    },
    Password:{
        type: String,
        required:true,
        unique: true,
    },
    DOB: {
        type: Date,
        required: true,
        unique: false
    },
    State: {
        type: String,
        required: true,
        unique: false
    },
    City: {
        type: String,
        required: true,
        unique: false
    },
    Village: {
        type: String,
        required: true,
        unique: false
    },
    Gov_id_of_Consumer: {
        type: String,
        required: true,
        unique: true
    },
    House_No: {
        type: String,
        required: true,
        unique: false
    },
    Mobile_No: {
        type: String,
        required: true,
        unique: true
    },
    Email: {
        type: String,
        required: false,
        unique: true
    },
    No_of_family_Members: {
        type: Number,
        required: true,
        unique: false
    },
    Gov_tap_Connect: {
        type: String,
        required: true,
        enum: ["YES", "NO"],
        default: "YES"
    },
})

const consumer = mongoose.model("Consumer", userSchema)
module.exports = consumer;