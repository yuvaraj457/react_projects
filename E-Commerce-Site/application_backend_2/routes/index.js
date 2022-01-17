const { login } = require('./user/loginRoute')
const { signup } = require('./user/signupRoute')
// const {upload, productUpload, products, productDetails, addToCart, getCartProducts} = require('./products')

module.exports = [
    {
        method : 'POST',
        path : '/login',
        handler : login,
        options: {
            auth: {
                mode: 'try'
            }
        }
    },
    {
        method : 'POST',
        path : '/signup',
        handler : signup,
        options : {
            auth : false
        }
    }

]

// router.get('/products', products)

// router.post('/productUpload', upload.single('productImage'), productUpload)

// router.get('/productDetails', productDetails)

// router.post('/addToCart', addToCart)

// router.get('/getCartProducts', getCartProducts)
