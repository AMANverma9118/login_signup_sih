const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    Personal: {
        type: String,
        required: true,
        unique: false
    },
    Name_of_Company: {
        type: String,
        required: true,
        unique: false
    },
    Name: {
        type: String,
        required: true,
        unique: false
    },
    Address_of_Company: {
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
    Type_of_Entity: {
        type: String,
        required: true,
        enum: ["Partnership","Indiviual","Company","Other"],
        default: 'Partnership'
    },
    Gov_id_of_Contractor: {
        type: String,
        required: true,
        unique: true
    },
    GST_reg_No: {
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
    Work_Exp: {
        type: String,
        required: true,
        unique: false
    },
})

const constructor = mongoose.model("Constructor",userSchema);
module.exports = constructor;