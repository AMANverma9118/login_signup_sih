const constru = require('../Modules/Constructor');


const ConstSignup = async (req,res) => {
    const { Email, Name} = req.body


    try {
        let checkUser = await constru.findOne({ "$or": [{ Email: Email }, { Name: Name }] })
        let Allinfo = await req.body;
        console.log(Allinfo);
        if (!checkUser) {

            let result = await constru.create({
                ...req.body,
            })
            res.send({
                data: result,
                message: "User created successfully....!!",
                status: true
            })
        }
        else if(!Allinfo){
            message: "Fill all the information";
        }
        else {
            res.status(403).json({ status: false, error: "User already exist" })
        }





    } catch (error) {
        res.status(403).json({ status: false, error: "Fill all the information" })
    }
}

const Constrlogin = async (req, res) => {
    try {
        const { Mobile_No } = req.body;

        // Check if the phone number exists in the Consumer collection
        const user = await constru.findOne({ Mobile_No });

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
            from: '+919118359330' // Replace with your Twilio number
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




module.exports = {
    ConstSignup,
    Constrlogin,
    verifyOTP
}