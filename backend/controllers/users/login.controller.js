const User = require('../../models/UserModel')
const bcrypt = require('bcryptjs')
const ms = require('ms')
const jwt = require('jsonwebtoken') 
require('dotenv').config()

/////////////////////////////////////////////////create token, set into cookie/////////////////////////////////////////////

const sendTokenResponse = (user, statusCode, res) => {
    const mes = "you're connected successfully"
    const token = user.getSignedJwtToken()
    const jwtCookieExpire = ms(process.env.JWT_COOKIE_EXPIRE); // Assurez-vous que c'est une valeur valide, par exemple "24h"

    console.log('JWT_COOKIE_EXPIRE:', jwtCookieExpire); // Ajoutez ce log pour voir la valeur
    console.log('Date.now() + jwtCookieExpire:', Date.now() + jwtCookieExpire); // Ajoutez ce log pour voir le calcul
    
    const options = {
        expires: new Date(Date.now() + jwtCookieExpire),
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
        token,
    })
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

module.exports.login = async(req, res) => {

    const { email, password } = req.body;
    await User.findOne({email}).select('+password')
    .then(async (user) => {
        if(!user){
            const mes = "user does not exist"
            return res.status(404).json({mes})
        }

        ///const isMatch = user.matchPassword(req.body.password) => another way to verify the password
        const isMatch = await bcrypt.compare(password, user.password)
        if(isMatch) {
            //const mes = "you're connected successfully"
            //const token = user.getSignedJwtToken() => another way to generate the jwt token
            //const token = jwt.sign({id:user._id}, process.env.SECRET_KEY, {expiresIn:process.env.JWT_EXPIRE})
            //res.status(200).json({mes, data:user, token: token})
            sendTokenResponse(user, 200, res)
        }else{
            mes = "password does not match"
            return res.status(400).json({mes})
        }

    })
    .catch(error => {
        console.error("Error in login:", error);
        const mes = "error from server"
        res.status(500).json({mes, data: error})
    })
}

module.exports.logout = (req, res) => {
    // Créer un cookie de 'déconnexion' qui expire immédiatement
    const options = {
        expires: new Date(0), // Expire dans 10 secondes
        httpOnly: true
    };

    if (process.env.NODE_ENV === 'production') {
        options.secure = true;
    }

    // Effacer le token en le remplaçant par une chaîne vide
    res
        .status(200)
        .cookie('token', '', options)
        .json({ succes: true, message: 'Déconnexion réussie' });
};


