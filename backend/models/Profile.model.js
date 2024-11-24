const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    img : {
        type : String
    },
    notes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'notes'
        }
    ]
}, { timestamps: true })

module.exports = mongoose.model('profile',profileSchema)