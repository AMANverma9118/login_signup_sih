const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    Name_of_Company: {
        type: String,
        required: true,
        unique: false,
        validate: {
            validator: value => /^[a-zA-Z0-9\s\-]{2,100}$/.test(value),
            message: 'Name of Company is not valid',
        },
    },
    Name: {
        type: String,
        required: true,
        unique: false,
        validate: {
            validator: value => /^[a-zA-Z\s]{3,50}$/.test(value),
            message: 'Name is not valid',
        },
    },
    Password: {
        type: String,
        required: true,
    },
    Address_of_Company: {
        type: String,
        required: true,
        unique: false,
        validate: {
            validator: value => /^[a-zA-Z0-9\s,.-]{5,200}$/.test(value),
            message: 'Address of Company is not valid',
        },
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
    Type_of_Entity: {
        type: String,
        required: true,
        enum: ["Partnership", "Individual", "Company", "Other"],
        default: 'Partnership',
    },
    Gov_id_of_Contractor: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: value => /^[A-Za-z0-9\-]{5,20}$/.test(value),
            message: 'Government ID of Contractor is not valid',
        },
    },
    GST_reg_No: {
        type: String,
        required: true,
        unique: false,
        validate: {
            validator: value => /^[A-Za-z0-9]{5,15}$/.test(value),
            message: 'GST Registration Number is not valid',
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
    Work_Exp: {
        type: String,
        required: true,
        unique: false,
        validate: {
            validator: value => /^[a-zA-Z0-9\s,.-]{10,500}$/.test(value),
            message: 'Work Experience is not valid',
        },
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

const constructor = mongoose.model("Constructor", userSchema);
module.exports = constructor;
