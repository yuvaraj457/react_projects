const userDetailsModel = require("../../models/userModel")


const getAllUsers = async (req, h) => {
    try{
        const data = await userDetailsModel.find({}).select(['-password', '-__v', '-address', '-cartProducts'])
        return h.response(data).code(200)
    }
    catch(error){
        return error
    }
}

module.exports = {getAllUsers}