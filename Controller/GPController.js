const GP = require('../Modules/GP');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const randomstring = require('randomstring');

const GPSignup = async (req, res) => {
    const { Email, Name, Password } = req.body



    try {
        let checkUser = await GP.findOne({ "$or": [{ Email: Email }, { Name: Name }] })

        if (!checkUser) {
            const salt = await bcrypt.genSalt()
            const UserPasswordHash = await bcrypt.hash(Password, salt)

            let result = await GP.create({
                ...req.body,
                Password: UserPasswordHash
            })
            res.send({
                data: result,
                message: "User created successfully....!!",
                status: true
            })
        }
        else {
            res.status(403).json({ status: false, error: "User already exist" })
        }





    } catch (error) {
        res.status(403).json({ status: false, error: error })
    }
}


const GPlogin = async (req, res) => {
    const { Gov_id_of_GP, Password } = req.body;
    try {
        const result = await GP.findOne({ Gov_id_of_GP: Gov_id_of_GP })
        if (!!result) {
            let isPasswordValid = await bcrypt.compare(Password, result.Password)
            console.log(Password);
            if (!!isPasswordValid) {
                const token = jwt.sign({ user_id: result?._id, Gov_id_of_GP }, process.env.TOKEN_KEY);

                res.send({
                    data: { ...result, token },
                    status: true
                })
            } else {
                res.status(403).json({ status: false, error: "Password/Gov_id_of_GP is not correct" })
            }
        }
        else {
            res.status(403).json({ status: false, error: "Password/Gov_id_of_GP is not correct" })
        }
    } catch (error) {
        res.status(403).json({ status: false, error: error })
    }
}






module.exports = {
    GPSignup,
    GPlogin
}