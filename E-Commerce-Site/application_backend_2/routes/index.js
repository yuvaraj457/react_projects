const { addToCart, getCartProducts, productQuantityUpdate, deleteCartProduct } = require('./products/cart');
const { products, productsUpload, productDetails, productUpdate, productUpload } = require('./products/product')
const { login } = require('./user/loginRoute')
const { signup } = require('./user/signupRoute');
const { getUser, editAddress, editPhone, activeAddress, logout, deleteAddress, authenticate } = require('./user/userRoute');
// const {upload, productUpload, products, productDetails, addToCart, getCartProducts} = require('./products')

module.exports = [
    {
        method : 'GET',
        path : '/authenticate',
        handler : authenticate
    },
    {
        method : 'POST',
        path : '/login',
        handler : login,
        options: {
            auth: false
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
        path: '/productUpload',
        handler: productUpload,
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
        method : 'POST',
        path : '/productUpdate',
        handler : productUpdate,
        options : {
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
        },
        options : {
            auth : false
        }
        
    },
    {
        method : 'GET',
        path : '/productDetails',
        handler : productDetails,
        options : {
            auth : false
        }
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
        handler : getUser,
        
    },
    {
        method : 'POST',
        path : '/editPhone',
        handler : editPhone
    },
    {
        method : 'POST',
        path : '/editAddress',
        handler : editAddress
    },
    {
        method : 'POST',
        path : '/activeAddress',
        handler : activeAddress
    },
    {
        method : 'POST',
        path : '/deleteAddress',
        handler : deleteAddress
    },
    {
        method : 'GET',
        path : '/logout',
        handler : logout
    },

]










