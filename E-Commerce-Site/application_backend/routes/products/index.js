const multer = require('multer')
const path = require('path')

const productDetailsModel = require('../../models/productsModel')
const userDetailsModel = require('../../models/userModel')

const storage = multer.diskStorage({
    destination : (req, file, cb) => {
        cb(null, './uploads/images')
    },
    filename : (req, file, cb) => {
        cb(null, Date.now() + '_' + file.fieldname + path.extname(file.originalname));
    }
})

const upload = multer({storage})

const products = (req, res) => {
    productDetailsModel.find({})
    .then((response) => res.status(200).send(response))
    .catch((error) => console.log(error))
}

const productUpload = (req, res) => {
    const { productName, productMRP, productPrice, productStar, productQuantity, productType } = req.body
    const data = productDetailsModel({
        productName,
        productMRP,
        productPrice,
        productStar,
        productQuantity,
        productType
    });
    data.productImage = req.file.filename
    data.save()
    .then(() => res.status(201).send('product uploaded successfully'))
    .catch((error) => console.log(error))
}

const productDetails = (req, res) => {
    const {productId} = req.query
    productDetailsModel.findOne({ _id: productId })
    .then((response) => res.status(200).send(response))
    .catch((error) => console.log(error));
}

const addToCart = (req, res) => {
    const {productId} = req.body
    const {_id} = req.user

    userDetailsModel.updateMany(
        {_id },
        {$addToSet : {cartProducts : {productId, quantity : 1 }}}
        )
        .then(() => res.status(200).send('Added to cart successfully'))
        .catch(error => console.log(error))
}

const deleteCartProduct = (req, res) => {
    const {productId} = req.body
    const {_id} = req.user

    userDetailsModel.updateMany(
        {_id },
        {$pull : {cartProducts : {productId}}}
        )
        .then(() => res.status(200).send('Deleted Successfully'))
        .catch(error => console.log(error))
}

const productQuantityUpdate = (req, res) => {
    const {productId, quantity} = req.body
    const {_id} = req.user

    userDetailsModel.updateMany(
        {_id, 'cartProducts.productId': productId },
        {
            $set : {'cartProducts.$.quantity' : quantity}}
        )
        .then(() => res.status(200).send('updated'))
        .catch(error => console.log(error))
}

const getCartProducts = (req, res) => {
    const {_id} = req.user
    userDetailsModel.find({_id}).select('cartProducts -_id')
    .then(response => res.status(200).send(response[0].cartProducts))
    .catch(error => console.log(error))
}
 
module.exports = {upload, productUpload, products, productDetails, addToCart, deleteCartProduct, getCartProducts, productQuantityUpdate}