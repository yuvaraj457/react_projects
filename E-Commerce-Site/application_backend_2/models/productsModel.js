const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productDetails = new Schema({
    productName : {type : String, require : true},
    productMRP : {type : Number, require : true},
    productDiscount : {type : Number, require : true},
    productPrice : {type : Number, require : true},
    productQuantity : {type : Number, require : true},
    productStar : {type : Number, require : true},
    productImage : {type : String, require : true},
    productThreeDView : {type : String, default : null},
    productType : {type : String, require : true},
})

const productDetailsModel = mongoose.model('productDetails', productDetails)
module.exports = productDetailsModel