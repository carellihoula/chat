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

        ///const isMatch = user.matchPassword(req.body.password) => another way to verify the password
        const isMatch = await bcrypt.compare(req.body.password, user.password)
        if(isMatch) {
            //const mes = "you're connected successfully"
            //const token = user.getSignedJwtToken() => another way to generate the jwt token
            //const token = jwt.sign({id:user._id}, process.env.SECRET_KEY, {expiresIn:process.env.JWT_EXPIRE})
            //res.status(200).json({mes, data:user, token: token})
            sendTokenResponse(user, 200, res)
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

//create token, set into cookie, 
const sendTokenResponse = (user, statusCode, res) => {
    const mes = "you're connected successfully"
    const token = user.getSignedJwtToken()
    const options = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE* 24 * 60 * 60 * 1000),
        httpOnly:true
    }

    if(process.env.NODE_ENV === 'production'){
        options.secure = true
    }

    res
    .status(statusCode)
    .cookie('token', token, options)
    .json({
        succes:true,
        mes,
        token 
    })
}