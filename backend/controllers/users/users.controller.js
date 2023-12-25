const User = require('../../models/UserModel')


module.exports.createUser = async (req, res) => {
    const newUser = new User(req.body)
    newUser.save()
    .then((user)=>{
        if(!user){
            const mes = "invalid content"
            res.status(404).json({mes})
        }
        //const mes = "User created successfully"
        //res.status(200).json({mes,data: user})
        sendTokenResponse(user, 200, res)
    })
    .catch((error)=>{
        const mes = "User not created"
        res.status(500).json({mes,data: error})
    })
}

const sendTokenResponse = (user, statusCode, res) => {
    const mes = "User created successfully"
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

