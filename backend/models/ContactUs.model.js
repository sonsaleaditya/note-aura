const mongoose = require('mongoose');

const contactUsSchema = new mongoose.Schema({
    fName:{
        type : String,
        required: true
    },
    email:{
        type : String,
        required:true
    },
    msg:{
        type:String,
        required:true
    }
},{timestamps:true})

module.exports = mongoose.model("contact_us",contactUsSchema);