const fs = require('fs')
const path = require('path')
const productDetailsModel = require('../../models/productsModel')

const fileHandler = file => {
    const fileName = Date.now() + '_product' + path.extname(file.hapi.filename)
    const data = file._data
    fs.writeFileSync('./uploads/images/' + fileName, data)
    return fileName
}

const productsUpload = (req, h) => {
    const { productName, productMRP, productPrice, productStar, productQuantity, productType, productImage } = req.payload
    try {
        const data = productDetailsModel({
            productName,
            productMRP,
            productPrice,
            productStar,
            productQuantity,
            productType,
            productImage : fileHandler(productImage)
        })
        data.save()
        return "Product Uploaded Successfully"
    }
    catch(error){
        return error
    }
    
}

const products = async (req, h) => {
    try{
        const data = await productDetailsModel.find({})
        return h.response(data).code(200)
    }
    catch(error){
        return error
    }
}

const productDetails = async(req, h) => {
    const {productId} = req.query
    const data = await productDetailsModel.findOne({ _id: productId })
    return data
}

module.exports = { productsUpload, products, productDetails}