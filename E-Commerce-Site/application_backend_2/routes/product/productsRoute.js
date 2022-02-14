const productDetailsModel = require("../../models/productsModel")

const products = async (req, h) => {
    try{
        const data = await productDetailsModel.find({})
        return h.response(data).code(200)
    }
    catch(error){
        return error
    }
}

module.exports = {products}