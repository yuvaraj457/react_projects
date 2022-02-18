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

const editUser = async (req, h) => {
    const {_id, userType} = req.payload
    try{
        await userDetailsModel.updateOne(
            {_id},
            {$set : {userType}}
        )
    return h.response('user updated').code(201)
    }
    catch(error){
        return error
    }
}

const deleteUser = async(req, h) => {
    const {_id} = req.payload
    try{
        await userDetailsModel.deleteOne({_id})
        return h.response('user deleted').code(202)
    }
    catch(error){
        return error
    }
}
module.exports = {getAllUsers, editUser}