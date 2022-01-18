const userDetailsModel = require('../../models/userModel')

const getUser = async(req, res) => {
    const {_id} = req.user
    const user = await userDetailsModel.findOne({_id}).select(['-_id', '-password', '-__v'])
    res.status(200).send(user)
}

const editPhone = async(req, res) => {
    const {phone} = req.body
    const {_id} = req.user
    userDetailsModel.updateMany(
        {_id},
        {
            $set : {'phone' : phone}
        }
    )
    .then(() => res.status(200).send('updated'))
    .catch(error => console.log(error))
}

const editAddress = async(req, res) => {
    const address = req.body
    console.log(address)
    const {_id} = req.user
    userDetailsModel.updateMany(
        {_id},
        {
            $set : {'address' : [address]}
        }
    )
    .then(() => res.status(200).send('updated'))
    .catch(error => console.log(error))
}

module.exports = {getUser, editPhone, editAddress}