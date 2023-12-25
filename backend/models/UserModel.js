const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

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
        match:[/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
         'Veuillez entrer une adresse e-mail valide'
        ]
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        select:false
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    isActif:{
        type: Boolean,
        default: false,
    },
    createAt:{
        type: Date,
        default: new Date()
    },
    role:{
        type: String,
        enum:['user', 'admin', 'publisher'],
        default: 'user'
    }
})

    userModel.pre('save', async function(next){
        const salt  = await bcrypt.genSaltSync(10);
        this.password = await bcrypt.hash(this.password, salt);
    })

const User = mongoose.model('User', userModel)

module.exports = User