const fs = require('fs')
const path = require('path')
const productDetailsModel = require('../../models/productsModel')
const { productUploadSchema } = require('../../validationSchema')

const fileHandler = file => {
    const fileName = Date.now() + '_product' + path.extname(file.hapi.filename)
    const data = file._data
    fs.writeFileSync('./uploads/images/' + fileName, data)
    return fileName
}

const productUpload = (req, h) => {
    const { productName, productMRP, productStar, productPrice, productDiscount, productQuantity,  productType, productImage } = req.payload
    const productData = req.payload
    const fileName = fileHandler(productImage)
    productData.productImage = fileName
    console.log(productData)
    try {
        const {value, error} = productUploadSchema.validate(productData, {abortEarly: false})

        if(error){
            return h.response(error.details).code(422)
        }

        const data = productDetailsModel({
            productName,
            productMRP,
            productPrice,
            productDiscount,
            productStar,
            productQuantity,
            productType,
            productImage : fileName
        })
        data.save()
        return h.response("Product Uploaded Successfully").code(201)
    }
    catch(error){
        return error
    }
}

const productUpdate = async (req, h) => {
    const {_id, productName, productMRP, productPrice, productDiscount, productStar, productQuantity, productType, productImage } = req.payload
    const data = req.payload
    delete data['_id']
    delete data['__v']
    try{
        const {value, error} = productUploadSchema.validate(data, {abortEarly: false})

        if(error){
            return h.response(error.details).code(422)
        }

        const update = {
            productName,
            productMRP : Number(productMRP),
            productPrice : Number(productPrice),
            productStar : Number(productStar),
            productQuantity : Number(productQuantity),
            productDiscount : Number(productDiscount),
            productType,
            productImage, 
        }

        await productDetailsModel.findOneAndUpdate({ _id }, update,  {new: true})
        return h.response('Product updated successfully').code(200)
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

module.exports = { productUpload, products, productDetails, productUpdate}