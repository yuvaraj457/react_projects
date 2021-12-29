const express = require('express')
const { login } = require('./user/loginRoute')
const { signup } = require('./user/signupRoute')
const router = express.Router()

router.post('/signup', signup)

router.post('/login', login)


module.exports = router