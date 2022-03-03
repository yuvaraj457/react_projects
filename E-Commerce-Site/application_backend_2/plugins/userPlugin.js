const { addToCart, productQuantityUpdate, deleteCartProduct } = require("../routes/user/cart")
const { login } = require("../routes/user/loginRoute")
const { signup, emailVerification, verifyUserViaEmail, getUserByToken } = require("../routes/user/signupRoute")
const { authenticate, editPhone, activeAddress, deleteAddress, logout, editAddress, getUser, changePassword, forgotPassword, resetPassword, resetPasswordViaEmailToken, refreshToken } = require("../routes/user/userRoute")

exports.plugin = {
    name : 'userPlugin',
    register : async (server, option) => {
        server.route([
            {
                method : 'GET',
                path : '/authenticate',
                handler : authenticate
            },
            {
                method : 'GET',
                path : '/auth/refreshToken',
                handler : refreshToken,
                options: {
                    auth: false
                }
            },
            {
                method : 'GET',
                path : '/getUser',
                handler : getUser,
                
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
                method : 'POST',
                path :  '/emailVerification',
                handler : emailVerification,
                options : {
                    auth : false
                }
            },
            {
                method : 'POST',
                path : '/verifyUserViaEmail',
                handler : verifyUserViaEmail,
                options : {
                    auth : false
                }
            },
            {
                method : 'POST',
                path : '/getUserByToken',
                handler : getUserByToken,
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
                method : 'POST',
                path : '/changePassword',
                handler : changePassword
            },
            {
                method : 'POST',
                path :'/forgotPassword',
                handler : forgotPassword,
                options: {
                    auth: false
                }
            },
            {
                method : 'POST',
                path : '/resetPassword',
                handler : resetPassword,
                options: {
                    auth: false
                }
            },
            {
                method : 'POST',
                path : '/resetPasswordViaEmailToken',
                handler : resetPasswordViaEmailToken,
                options : {
                    auth : false
                }
            },
            {
                method : 'GET',
                path : '/logout',
                handler : logout
            },
        ])
    }
}