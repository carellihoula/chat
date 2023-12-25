const express =  require('express')
const { createUser } = require('../controllers/users/users.controller')
const router = express.Router()

router.post('/', createUser)

module.exports = router