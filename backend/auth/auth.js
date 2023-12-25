const jwt = require('jsonwebtoken') 
require('dotenv').config()

module.exports.auth = (req, res, next) => {
    const authorizationHeader = req.headers.authorization

    if(!authorizationHeader){
        const mes = "le jeton que vous avez fourni n'est pas valide"
        return res.status(401).json({mes})
    }
    const token = authorizationHeader.split(' ')[1]

    const decodedToken = jwt.verify(token, process.env.SECRET_KEY, (error ,decodedToken) => {
        if(error){
            const mes = "vous n'avez l'autorisation d'acceder à cette ressource"
            return res.status(401).json({mes})
        }
        const userId = decodedToken.userId
        if(req.body.userId && req.body.userId !== userId){
            const message = `L'identifiant de l'utilisateur est invalide.`
            res.status(401).json({ message })
        }else{
            next()
        }
    })
}