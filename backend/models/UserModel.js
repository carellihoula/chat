const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken') 

const userModel = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    about:{
        type: String,
        trim: true,
        default: ""
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
    userModel.methods.getSignedJwtToken = function() {
        return jwt.sign({id: this._id}, 
                process.env.SECRET_KEY, 
                {expiresIn:process.env.JWT_EXPIRE}
            )
    }
    userModel.methods.matchPassword = async function(enteredPassword) {
        return await bcrypt.compare(enteredPassword, this.password)
    }

const User = mongoose.model('User', userModel)

module.exports = User