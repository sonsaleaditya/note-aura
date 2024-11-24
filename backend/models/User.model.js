const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    fName: {
        type: String,
        required: true

    },
    lName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    }
    ,
    password: {
        type: String,
        required: true
    },
    role :{
        type : String, 
        enum : ["Admin","User"],
        default: "User"
    },
    date: {
        type: Date,
        defaul: Date.now
    },
    img:{
        type: String
    },
    profile : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "profile"
    }

}, {
    timestamps: true
});

module.exports = mongoose.model('user', userSchema);