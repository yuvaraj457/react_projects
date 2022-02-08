const { getCartProducts } = require("../routes/products/cart");
const { productUpload, productUpdate, products, productDetails } = require("../routes/products/product");

exports.plugin = {
    name : 'productPlugin', 
    register : async(server, option) => {
        server.route([
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
                method : 'GET',
                path : '/getCartProducts',
                handler : getCartProducts
            },
        ])
        
    }

}
