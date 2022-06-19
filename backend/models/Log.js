const mongoose = require('mongoose');
const { Schema } = mongoose;

const logSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title: {
        type: String,
        required: true
    },

    text: {
        type: String,
        required: true,
    },

    date: {
        type: Date,
        default: Date.now
    } 
});

const Log = mongoose.model('log', logSchema); 

module.exports = Log;