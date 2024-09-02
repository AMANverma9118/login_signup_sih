const constru = require('../Modules/Constructor');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const randomstring = require('randomstring');

const ConstSignup = async (req, res) => {
    const { Email, Name, Password } = req.body



    try {
        let checkUser = await constru.findOne({ "$or": [{ Email: Email }, { Name: Name }] })

        if (!checkUser) {
            const salt = await bcrypt.genSalt()
            const UserPasswordHash = await bcrypt.hash(Password, salt)

            let result = await constru.create({
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
        res.status(405).json({ status: false, error: error })
    }
}


const Constrlogin = async (req, res) => {
    const { Gov_id_of_Contractor, Password } = req.body;
    try {
        const result = await constru.findOne({ Gov_id_of_Contractor: Gov_id_of_Contractor })
        console.log(result);
        if (!!result) {
            let isPasswordValid = await bcrypt.compare(Password, result.Password)
            console.log(Password);
            if (!!isPasswordValid) {
                console.log("he");
                const token = jwt.sign({ user_id: result?._id, Gov_id_of_Contractor }, process.env.TOKEN_KEY);

                res.send({
                    data: { ...result, token },
                    status: true
                })
            } else {
                res.status(403).json({ status: false, error: "Password/Gov_id_of_Contractor is not correct" })
            }
        }
        else {
            res.status(403).json({ status: false, error: "Password/Gov_id_of_Contractor is not correct" })
        }
    } catch (error) {
        res.status(405).json({ status: false, error: error })
    }
}






module.exports = {
    ConstSignup,
    Constrlogin
}