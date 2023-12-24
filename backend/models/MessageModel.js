const mongoose = require('mongoose')

const messageModel = new mongoose.Schema({
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    received:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content:{
        type: String,
        required: true
    },
    timestamp:{
        type: Date,
        default: new Date()
    },
    isRead: {
        type: Boolean,
        default: false // Messages are unread by default
    }
})

const Message = mongoose.model('Message', messageModel)
module.exports = Message