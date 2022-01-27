const userDetailsModel = require('../../models/userModel')
const { addressFormSchema } = require('../../validationSchema')

const getUser = async(req, h) => {
    const {sid} = req.state
    const user = await userDetailsModel.findOne({_id : sid}).select(['-_id', '-password', '-__v'])
    return h.response(user).code(200)
}

const editPhone = async(req, h) => {
    const {phone} = req.payload
    const {sid} = req.state
    try{
       await userDetailsModel.updateMany(
            {_id : sid},
            {
                $set : {'phone' : phone}
            }
        )
        return h.response('updated').code(200)
    }
    catch(error){
        return error
    }
}

const editAddress = async(req, h) => {
    const address = req.payload
    console.log(address, req.state)
    const {sid} = req.state

    const {value, error} = addressFormSchema.validate(req.payload, {abortEarly: false})
            if(error){
                return h.response(error.details).code(422)
            }

    try{
        await userDetailsModel.updateMany(
            {_id : sid},
            {
                $addToSet : {address}
            }
        )
        return h.response('updated').code(200)
    }
    catch(error){
        return error
    }

}

const activeAddress = async (req, h) => {
    const {activeAddress} = req.payload
    const {sid} = req.state
    try{
       await userDetailsModel.updateMany(
            {_id : sid},
            {
                $set : {activeAddress}
            }
        )
        return h.response('updated').code(200)
    }
    catch(error){
        return error
    }
}

const deleteAddress = async (req, h) => {
    const {address} = req.payload
    const {sid} = req.state
    try{
        await userDetailsModel.updateMany(
             {_id : sid},
             {
                $pull : {address}
             }
         )
         return h.response('Deleted Successfully').code(200)
     }
     catch(error){
         return error
     }
}

const logout = async (req, h) => {
    return h.response('Bye').unstate('sid')
}

module.exports = {getUser, editPhone, editAddress, activeAddress, logout, deleteAddress}