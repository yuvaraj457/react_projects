const multer = require('multer')
const path = require('path')

const productDetailsModel = require('../../models/productsModel')

const storage = multer.diskStorage({
    destination : (req, file, cb) => {
        cb(null, './uploads/images')
    },
    filename : (req, file, cb) => {
        cb(null, Date.now() + '_' + file.fieldname + path.extname(file.originalname));
    }
})

const upload = multer({storage})

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

module.exports = {upload, productUpload}