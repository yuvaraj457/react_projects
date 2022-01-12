const userDetailsModel = require('../../models/userModel')

const getUser = async(req, res) => {
    const {_id} = req.user
    const user = await userDetailsModel.findOne({_id}).select(['-_id', '-password', '-cartProducts', '-__v'])
    res.status(200).send(user)
}

module.exports = {getUser}