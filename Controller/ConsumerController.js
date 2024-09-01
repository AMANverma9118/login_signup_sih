const Consum = require('../Modules/Consumer');
const OtpModel = require('../Modules/OTP');
const otpGenerator = require('otp-generator');
const twilio = require('twilio');
const dotenv = require("dotenv");

require("dotenv").config();

const accountSid = 'AC358b2bbd039b2bf9cf113ec64a2655d0';
const authToken = '6d04a66aa8dfd64c5844095a9fc63c42';
const twilioClient = new twilio(accountSid, authToken);

const ConsumSignup = async (req, res) => {
    const { Email, Name } = req.body;

    try {
        let checkUser = await Consum.findOne({ "$or": [{ Email: Email }, { Name: Name }] });
        if (!checkUser) {
            let result = await Consum.create({ ...req.body });
            res.send({
                data: result,
                message: "User created successfully!",
                status: true
            });
        } else {
            res.status(403).json({ status: false, error: "User already exists" });
        }
    } catch (error) {
        console.error("Signup Error:", error);  
        res.status(500).json({ status: false, error: "Internal server error" });
    }
}

const Consumlogin = async (req, res) => {
    try {
        const { Mobile_No } = req.body;

        // Check if the phone number exists in the Consumer collection
        const user = await Consum.findOne({ Mobile_No });

        if (!user) {
            return res.status(400).json({
                success: false,
                msg: "Phone number not registered"
            });
        }

        // Generate OTP
        const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false });

        // Set OTP expiration time to 5 minutes from now
        const otpExpiration = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

        // Save OTP and expiration time in the database
        await OtpModel.findOneAndUpdate(
            { Mobile_No },
            { otp, otpExpiration },
            { upsert: true, new: true, setDefaultsOnInsert: true }
        );

        // Send OTP to the phone number
        await twilioClient.messages.create({
            body: `Your OTP is: ${otp}`,
            to: Mobile_No,
            from: '+18178860192' // Replace with your Twilio number
        });

        return res.status(200).json({
            success: true,
            msg: "OTP sent successfully!"
        });
    } catch (error) {
        console.error("Login Error:", error);  // Log the error
        return res.status(500).json({
            success: false,
            msg: "Internal server error"
        });
    }
}

const verifyOTP = async (req, res) => {
    const { otp } = req.body; 

   
    if (!otp) {
        return res.status(400).json({ status: false, message: 'OTP is required' });
    }

    try {
    
        const otpEntry = await OtpModel.findOne({ otp });

        if (!otpEntry) {
            return res.status(400).json({ status: false, message: 'Invalid OTP' });
        }

    
        if (Date.now() > otpEntry.otpExpiration.getTime()) {
            return res.status(400).json({ status: false, message: 'OTP has expired' });
        }

        await OtpModel.updateOne(
            { _id: otpEntry._id },
            { $unset: { otp: "", otpExpiration: "" } }
        );

       
        res.status(200).json({ status: true, message: 'OTP verified successfully' });
    } catch (error) {
        console.error("OTP Verification Error:", error);
        res.status(500).json({ status: false, message: 'Internal server error' });
    }
};

module.exports = {
    ConsumSignup,
    Consumlogin,
    verifyOTP
}
