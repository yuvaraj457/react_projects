const bcrypt = require('bcrypt')
const userDetailsModel = require('../../models/userModel')

const signup = (req, h) => {
        const {email, firstName, lastName, password} = req.payload
        bcrypt.hash(password, 10)
        .then(async(hashed) => {
            const data = await userDetailsModel({
                firstName,
                lastName,
                email,
                password : hashed
            })
            data.save()
        })
        .then(() => h.response('Successfully registered').code(201))
        .catch(error => Boom.unauthorized(error))
}

module.exports = {signup}