const dotenv = require('dotenv').config();
const mongoose = require('mongoose');


const connectToMongo = () => {
    mongoose.connect(process.env.MONGO_URL).then(() => {
        console.log("connection succesfull !!")
    }).catch((error) => {
        console.log(error);
    })

    
}

module.exports = connectToMongo;