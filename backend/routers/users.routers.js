const express =  require('express')
const { createUser, getAllUsers, getUserById, updateUser, deleteUser, deleteManyUsers } = require('../controllers/users/users.controller')
const { auth } = require('../auth/auth')
const router = express.Router()

router.post('/', createUser)
router.get('/', getAllUsers)
router.get('/:id', getUserById)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)
router.delete('/', deleteManyUsers)

module.exports = router