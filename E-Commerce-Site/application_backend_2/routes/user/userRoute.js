const userDetailsModel = require('../../models/userModel')

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
    console.log(address)
    const {sid} = req.state
    try{
        userDetailsModel.updateMany(
            {_id : sid},
            {
                $addToSet : {address : {address}}
            }
        )
        return h.response('updated').code(200)
    }
    catch(error){
        return error
    }

}

module.exports = {getUser, editPhone, editAddress}