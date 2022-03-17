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

const productUpload = async(req, h) => {
    const { productName, productMRP, productThreeDView, productStar, productPrice, productDiscount, productQuantity,  productType, productImage } = req.payload
    const productData = req.payload
    
    if(productImage){
        const fileName = fileHandler(productImage)
        productData.productImage = fileName
    }

    const product = await productDetailsModel.find({productName})
    if(product.length > 0){
        return h.response([{path : ['Exists'], message : 'Product already Exisits'}]).code(422)
    }
    try {
        const {value, error} = productUploadSchema.validate(productData, {abortEarly: false})

        if(error){
            return h.response(error.details).code(422)
        }

        console.log(productData)
        const data = productDetailsModel({
            productName,
            productMRP,
            productPrice,
            productDiscount,
            productStar,
            productQuantity,
            productType,
            productThreeDView : 'abc',
            productImage : productData.productImage
        })
        data.save()
        return h.response("Product Uploaded Successfully").code(201)
    }
    catch(error){
        return error
    }
}

const productUpdate = async (req, h) => {
    const {_id, productName, productThreeDView, productMRP, productPrice, productDiscount, productStar, productQuantity, productType, productImage } = req.payload
    const data = req.payload
    delete data['_id']
    delete data['__v']
    console.log(req)
    try{
        const {value, error} = productUploadSchema.validate(data, {abortEarly: false})

        if(error){
            return h.response(error.details).code(422)
        }

        const update = {
            productName,
            productThreeDView ,
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

const productDelete = async(req, h) => {
    const {_id} = req.payload

    try{
        const data = await productDetailsModel.deleteOne({_id})
        return h.response('Deleted successfully').code(202)
    }
    catch(error){
        return error
    }
}


const productDetails = async(req, h) => {
    console.log(req)
    const {productId} = req.query
    const data = await productDetailsModel.findOne({ _id: productId })
    return data
}

module.exports = { productUpload, productDetails, productUpdate, productDelete}