const userShema = require('../../models/User.model');
const bcrypt = require('bcrypt')
const profileSchema = require("../../models/Profile.model")
const signUp = async (req, res) => {
    try {
        //validation
        const { fName, lName, email, password, role } = req.body;

        if (!fName || !lName || !email || !password) {
            return res.status(400).json({
                succes: false,
                msg: "All Fields Are Required!!"
            })
        }

        //check whether user exist with this mail or not
        const user = await userShema.findOne({ email: email });
        if (user) {
            return res.status(409).json({
                succes: false,
                msg: "User Already Exist!!"
            })
        }

        const hashedPass = await bcrypt.hash(password, 10);
       
        let img = `https://api.dicebear.com/5.x/initials/svg?seed=${fName[0]}${lName[0]}`;

        const registeredUser = await userShema.create({ fName, lName, email, password: hashedPass, role, img: img });


        const profile = await profileSchema.create({ userId: registeredUser._id, img: img });

       return res.status(200).json({
            succes: true,
            msg: "User Registered Succefully!!"
            ,
            profile: profile
        })

    } catch (error) {
        return res.status(500).json({
            succes: false,
            msg: "Error Occured While Signing Up!!"
        })
    }
}

const healthCheck = (req, res) => {
    try {
        res.status(200).json({
            succes: true,
            msg: "everything good here !"
        })
    } catch (error) {

    }
}


module.exports = { signUp, healthCheck }