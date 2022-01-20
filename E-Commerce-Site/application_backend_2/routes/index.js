const { addToCart, getCartProducts, productQuantityUpdate, deleteCartProduct } = require('./products/cart');
const { products, productsUpload, productDetails } = require('./products/product')
const { login } = require('./user/loginRoute')
const { signup } = require('./user/signupRoute');
const { getUser } = require('./user/userRoute');
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
    },
    {
        method: 'GET',
        path: '/static/images/{file}',
        handler: function (request, h) {
            return h.file('images/'+request.params.file);
        }
    },
    {
        method : 'GET',
        path : '/productDetails',
        handler : productDetails
    },
    {
        method : 'POST',
        path : '/addToCart',
        handler : addToCart
    },
    {
        method : 'GET',
        path : '/getCartProducts',
        handler : getCartProducts
    },
    {
        method : 'POST',
        path : '/productQuantityUpdate',
        handler : productQuantityUpdate
    },
    {
        method : 'POST',
        path : '/deleteCartProduct',
        handler : deleteCartProduct
    },
    {
        method : 'GET',
        path : '/getUser',
        handler : getUser
    }

]



// router.post('/editPhone', editPhone)

// router.post('/editAddress', editAddress)

// module.exports = router










