const userDetailsModel = require("../../models/userModel")

const addToCart = async (req, h) => {
    const {productId} = req.payload
    // const {sid} = req.state
    const {_id} = req.auth.credentials
    
    try{
        await userDetailsModel.updateMany(
            {_id, 'cartProducts.productId':{$ne : productId}},
            {$push : {cartProducts : {productId, quantity : 1 }}}
            )
        return h.response('Added to cart successfully').code(201)
    }
    catch(error){
        return error
    }                   
}

const getCartProducts = async (req, h) => {
    // const {sid} = req.state
    const {_id} = req.auth.credentials
   
    const data = await userDetailsModel.find({_id }).select('cartProducts -_id')
    return data[0].cartProducts
}

const productQuantityUpdate = async(req, h) => {
    const {productId, quantity} = req.payload
    const {sid} = req.state
    try{
        await userDetailsModel.updateMany(
            {_id : sid, 'cartProducts.productId': productId},
            {
                $set : {'cartProducts.$.quantity' : quantity}}
            )
        return h.response('updated').code(200)
    }
    catch(error){
        return error
    }
}

const deleteCartProduct = async (req, h) => {
    const {productId} = req.payload
    const {sid} = req.state
    try{
        await userDetailsModel.updateMany(
            {_id : sid},
            {$pull : {cartProducts : {productId}}}
            )
        return h.response('Deleted Successfully').code(200)
    }
    catch(error){
        return error
    }
}

module.exports = {addToCart, getCartProducts, productQuantityUpdate, deleteCartProduct}