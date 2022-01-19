const { products, productsUpload } = require('./products/product')
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
    },
    {
        method: 'POST',
        path: '/productsUpload',
        handler: productsUpload,
        options: {
            payload: {
                parse: true,
                output: 'stream',
                multipart: true, 
            },
            auth : false
        }
    },
    {
        method : 'GET',
        path : '/products',
        handler : products,
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
