const { login } = require('./user/loginRoute')
// const { signup } = require('./user/signupRoute')
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
        method : 'GET',
        path : '/',
        handler : (req, h) => {
            return 'This is private Page'
        }
        
    }

]

// router.post('/signup', signup)

// router.post('/login', login)

// router.get('/products', products)

// router.post('/productUpload', upload.single('productImage'), productUpload)

// router.get('/productDetails', productDetails)

// router.post('/addToCart', addToCart)

// router.get('/getCartProducts', getCartProducts)
