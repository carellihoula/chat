const express =  require('express')
const { getTest } = require('../controllers/users/users.controller')
const router = express.Router()

router.get('/', require(getTest))