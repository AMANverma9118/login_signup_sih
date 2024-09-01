const Daily = require('../../Modules/Daily_Wages');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const randomstring = require('randomstring');

const DailySignup = async (req, res) => {
    const { Email, Name, Password } = req.body



    try {
        let checkUser = await Daily.findOne({ "$or": [{ Email: Email }, { Name: Name }] })

        if (!checkUser) {
            const salt = await bcrypt.genSalt()
            const UserPasswordHash = await bcrypt.hash(Password, salt)

            let result = await Daily.create({
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


const Dailylogin = async (req, res) => {
    const { Gov_id_of_Daily_Wages, Password } = req.body;
    try {
        const result = await Daily.findOne({ Gov_id_of_Daily_Wages: Gov_id_of_Daily_Wages })
        console.log(result);
        if (!!result) {
            let isPasswordValid = await bcrypt.compare(Password, result.Password)
            if (!!isPasswordValid) {
                const token = jwt.sign({ user_id: result?._id, Gov_id_of_Daily_Wages }, process.env.TOKEN_KEY);

                res.send({
                    data: { ...result, token },
                    status: true
                })
            } else {
                res.status(403).json({ status: false, error: "Password/Gov_id_of_Daily_Wages is not correct" })
            }
        }
        else {
            res.status(403).json({ status: false, error: "Password/Gov_id_of_Daily_Wages is not correct" })
        }
    } catch (error) {
        res.status(403).json({ status: false, error: error })
    }
}


module.exports = {
    DailySignup,
    Dailylogin,
}