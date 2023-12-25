const User = require('../../models/UserModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken') 
require('dotenv').config()

module.exports.login = async(req, res) => {
    await User.findOne({email: req.body.email}).select('+password')
    .then(async (user) => {
        if(!user){
            const mes = "user does not exist"
            return res.status(404).json({mes})
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password)
        if(isMatch) {
            const mes = "you're connected successfully"
            const token = jwt.sign({id:user._id}, process.env.SECRET_KEY, {expiresIn:'24h'})
            
            res.status(200).json({mes, data:user, token: token})
        }else{
            mes = "password does not match"
            res.status(400).json({mes})
        }

    })
    .catch(error => {
        const mes = "error from server"
        res.status(500).json({mes, data: error})
    })
}