const mongoose = require('mongoose');

const NotesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true

    },
    description: {
        type: String,
        required: true,

    }
    ,
    tag: {
        type: String,
        default: 'general'
    },

    date: {
        type: Date,
        default: Date.now()
    }
    ,
    reminderTime: {
        type : Date,
        
    }

});

module.exports = mongoose.model('notes', NotesSchema);