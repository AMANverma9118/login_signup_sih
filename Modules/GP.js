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
    Gov_id_of_GP: {
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
    fcmToken: {
        type:String,
        default:null
    },
    
    deviceType : {type:String ,default:null},
    token : {type:String, default:''}
})

const gp = mongoose.model("gp",userSchema);
module.exports = gp;