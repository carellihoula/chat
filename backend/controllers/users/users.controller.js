const User = require('../../models/UserModel')


module.exports.createUser = async (req, res) => {
    const newUser = new User(req.body)
    newUser.save()
    .then((user)=>{
        if(!user){
            const mes = "invalid content"
            res.status(404).json({mes})
        }
        const mes = "User created successfully"
        res.status(200).json({mes,data: user})
    })
    .catch((error)=>{
        const mes = "User not created"
        res.status(500).json({mes,data: error})
    })
}

