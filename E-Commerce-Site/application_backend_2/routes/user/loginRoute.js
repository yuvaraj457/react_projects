require('dotenv').config();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Boom = require('@hapi/boom')

const userDetailsModel = require('../../models/userModel')

const login = async (req, h) => {
        const { email, password } = req.payload
        const data = await userDetailsModel.findOne({ userEmail: email });

        if(!data || !(await  bcrypt.compare(password, data.password))){
            throw Boom.unauthorized()
        }
        req.cookieAuth.set({id : data._id})
        return {id : data._id}
}



module.exports = { login }