const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
        unique: false,
        validate: {
            validator: value => /^[a-zA-Z\s]{3,20}$/.test(value),
            message: 'Name is not valid',
        },
    },
    Password: {
        type: String,
        required: true,
        unique: true,
    },
    DOB: {
        type: Date,
        required: true,
        unique: false,
    },
    State: {
        type: String,
        required: true,
        unique: false,
        validate: {
            validator: value => /^[a-zA-Z\s.]{2,50}/.test(value),
            message: 'State is not valid',
        },
    },
    City: {
        type: String,
        required: true,
        unique: false,
        validate: {
            validator: value => /^[a-zA-Z\s]{2,50}$/.test(value),
            message: 'City is not valid',
        },
    },
    Village: {
        type: String,
        required: true,
        unique: false,
        validate: {
            validator: value => /^[a-zA-Z\s]{2,50}$/.test(value),
            message: 'Village is not valid',
        },
    },
    Gov_id_of_Consumer: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: value => /^[A-Za-z0-9\-]{5,20}$/.test(value),
            message: 'Government ID is not valid',
        },
    },
    House_No: {
        type: String,
        required: true,
        unique: false,
        validate: {
            validator: value => /^[a-zA-Z0-9\s\-]{1,50}$/.test(value),
            message: 'House number is not valid',
        },
    },
    Mobile_No: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: value => /^[6789][0-9]{9}$/.test(value),
            message: 'Mobile number must start with 6, 7, 8, or 9 and be 10 digits long',
        },
    },
    Email: {
        type: String,
        required: false,
        unique: true,
        validate: {
            validator: value => /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(value),
            message: 'Email must be a valid Gmail address',
        },
    },
    No_of_family_Members: {
        type: Number,
        required: true,
        unique: false,
    },
    Gov_tap_Connect: {
        type: String,
        required: true,
        enum: ["YES", "NO"],
        default: "YES",
    },
    fcmToken: {
        type: String,
        default: null,
    },
    deviceType: {
        type: String,
        default: null,
    },
    token: {
        type: String,
        default: '',
    },
});

const consumer = mongoose.model("Consumer", userSchema);
module.exports = consumer;
