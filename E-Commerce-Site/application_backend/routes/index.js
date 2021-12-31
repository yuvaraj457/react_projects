const express = require('express')
const { login } = require('./user/loginRoute')
const { signup } = require('./user/signupRoute')
const {upload, productUpload, products} = require('./products')
const router = express.Router()

router.post('/signup', signup)

router.post('/login', login)

router.get('/products', products)

router.post('/productUpload', upload.single('productImage'), productUpload)


module.exports = router