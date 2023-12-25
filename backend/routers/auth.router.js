const express =  require('express')
const { createUser } = require('../controllers/users/users.controller')
const { login } = require('../controllers/users/login.controller')
const router = express.Router()

router.post('/login', login)

module.exports = router