require('dotenv').config();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Boom = require('@hapi/boom')

const userDetailsModel = require('../../models/userModel')

const login = async (req, h) => {
    return new Promise(async (resolve, reject) => {
        const { email, password } = req.payload
        const data = await userDetailsModel.findOne({ userEmail: email });
        if (data) {
            bcrypt.compare(password, data.password)
                .then((result) => {
                    if (result) {
                        const token = jwt.sign({ _id: data._id }, process.env.TOKEN_SECRET)
                        h.state('token', token)
                        return resolve({ token: token })
                    }
                    else {
                         reject(Boom.unauthorized())
                    }
                })
                .catch((error) => console.log(error));
        }
        else {
            reject(Boom.unauthorized())
        }
    })

}

module.exports = { login }