const express = require('express')
const {registerUser, loginUser, getUser, updateProfile, getAllusers, deleteUser} = require('../controllers/UserController')

const router = express.Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/user/:id', getUser)
router.put('/update/:id', updateProfile)
router.get('/users', getAllusers)
router.delete('/delete/:id', deleteUser)

module.exports = router