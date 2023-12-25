const mongoose = require('mongoose')

const userModel = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    isActif:{
        type: Boolean,
        default: false,
    },
    timestamp:{
        type: Date,
        default: new Date()
    }
})

const User = mongoose.model('User', userModel)

module.exports = User