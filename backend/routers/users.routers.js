const express =  require('express')
const { createUser } = require('../controllers/users/users.controller')
const { auth } = require('../auth/auth')
const router = express.Router()

router.post('/',auth, createUser)

module.exports = router