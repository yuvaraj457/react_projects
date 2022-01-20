const userDetailsModel = require('../../models/userModel')

const getUser = async(req, h) => {
    const {sid} = req.state
    const user = await userDetailsModel.findOne({_id : sid}).select(['-_id', '-password', '-__v'])
    return h.response(user).code(200)
}

// const editPhone = async(req, res) => {
//     const {phone} = req.payload
//     const {_id} = req.user
//     userDetailsModel.updateMany(
//         {_id},
//         {
//             $set : {'phone' : phone}
//         }
//     )
//     .then(() => res.status(200).send('updated'))
//     .catch(error => console.log(error))
// }

// const editAddress = async(req, res) => {
//     const address = req.body
//     console.log(address)
//     const {_id} = req.user
//     userDetailsModel.updateMany(
//         {_id},
//         {
//             $set : {'address' : [address]}
//         }
//     )
//     .then(() => res.status(200).send('updated'))
//     .catch(error => console.log(error))
// }

module.exports = {getUser}