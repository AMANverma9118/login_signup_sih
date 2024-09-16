const Consum = require('../Modules/Consumer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Helper function to validate the password
const validatePassword = (password) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@<#$%])[a-zA-Z\d@<#$%]{8,}$/.test(password);

const ConsumSignup = async (req, res) => {
    const { Email, Name, Password } = req.body;

    try {
        // Validate the password before proceeding
        if (!validatePassword(Password)) {
            return res.status(400).json({ 
                status: false, 
                error: "Password must be at least aman 8 characters long and include one uppercase letter, one lowercase letter, one digit, and one special character (@, <, #, $, %)." 
            });
        }

        // Check if the user already exists
        let checkUser = await Consum.findOne({ "$or": [{ Email: Email }, { Name: Name }] });

        if (!checkUser) {
            const salt = await bcrypt.genSalt();
            const UserPasswordHash = await bcrypt.hash(Password, salt);

            let result = await Consum.create({
                ...req.body,
                Password: UserPasswordHash
            });

            res.send({
                data: result,
                message: "User created successfully....!!",
                status: true
            });
        } else {
            res.status(403).json({ status: false, error: "User already exists." });
        }

    } catch (error) {
        res.status(500).json({ status: false, error: error.message });
    }
};

const Consumlogin = async (req, res) => {
    const { Gov_id_of_Consumer, Password } = req.body;

    try {
        const result = await Consum.findOne({ Gov_id_of_Consumer: Gov_id_of_Consumer });

        if (result) {
            let isPasswordValid = await bcrypt.compare(Password, result.Password);

            if (isPasswordValid) {
                const token = jwt.sign({ user_id: result._id, Gov_id_of_Consumer }, process.env.TOKEN_KEY);

                res.send({
                    data: { ...result._doc, token }, 
                    status: true
                });
            } else {
                res.status(403).json({ status: false, error: "Password is incorrect." });
            }
        } else {
            res.status(403).json({ status: false, error: "Government ID is incorrect." });
        }
    } catch (error) {
        res.status(500).json({ status: false, error: error.message });
    }
};

module.exports = {
    ConsumSignup,
    Consumlogin
};
