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
        type: String,
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
    Gov_id_of_Daily_Wages: {
        type: String,
        required: true,
        unique: true
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
    Work_exp: {
        type: String,
        required: true,
        unique: false
    },
    Last_qualification: {
        type: String,
        required: true,
        unique: false
    },
    Specialization: {
        type: String,
        required: true,
        unique: false
    },
    Department: {
        type: String,
        required: true,
        unique: false
    },
})

const daily_wages = mongoose.model("Daily_Wages",userSchema);
module.exports = daily_wages;