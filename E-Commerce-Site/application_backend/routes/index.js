const express = require('express')
const { login } = require('./user/loginRoute')
const { signup } = require('./user/signupRoute')
const { getUser, editPhone, editAddress } = require('./user/userRoute')
const {upload, productUpload, products, productDetails, addToCart, getCartProducts, productQuantityUpdate, deleteCartProduct} = require('./products')
const router = express.Router()

router.post('/signup', signup)

router.post('/login', login)

router.get('/products', products)

router.post('/productUpload', upload.single('productImage'), productUpload)

router.get('/productDetails', productDetails)

router.post('/addToCart', addToCart)

router.get('/getCartProducts', getCartProducts)

router.post('/productQuantityUpdate', productQuantityUpdate)

router.post('/deleteCartProduct', deleteCartProduct)

router.get('/getUser', getUser)

router.post('/editPhone', editPhone)

router.post('/editAddress', editAddress)

module.exports = router