const dotenv = require('dotenv').config();
const userShema = require('../../models/User.model');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const signIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                succes: false,
                msg: "All Fields Are Mandatory!!"
            })
        }

        //check for user
        const user = await userShema.findOne({ email: email });
        if (!user) {
            return res.status(400).json({
                succes: false,
                msg: "User Not Exist!!"
            })
        }

        //match password
        const validPass = await bcrypt.compare(password, user.password);
        if (!validPass) {
            return res.status(400).json({
                succes: false,
                msg: "Password Is Wrong!!!!"
            })
        }

        const payLoad = {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            img: user.img
        }

        const options = {
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
            httpOnly: true,
        }

        const token = await jwt.sign(payLoad, process.env.JWT_SECRET, {
            expiresIn: '1h'
        })

        user.password = undefined;
        user.token = token;
        return res.cookie('token', token, options).status(200).json({
            succes: true,
            msg: "Succesfully Signed In!!",
            user: user,
            token: token,
            payLoad

        })

    } catch (error) {
        return res.status(500).json({

            succes: false,
            msg: "Error Occured While Signing In!!"
        })
    }
}

module.exports = { signIn }