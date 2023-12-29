const express =  require('express')
//const { createUser } = require('../controllers/users/users.controller')
const { login, logout } = require('../controllers/users/login.controller')
const router = express.Router()

router.post('/login', login)
router.post('/logout', logout)


module.exports = router