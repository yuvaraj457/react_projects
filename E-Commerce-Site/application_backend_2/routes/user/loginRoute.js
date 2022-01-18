require('dotenv').config();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Boom = require('@hapi/boom')

const userDetailsModel = require('../../models/userModel');
const { loginSchema } = require('../../validationSchema');

const login = async (req, h) => {
        const { email, password } = req.payload

        const {value, error} = loginSchema.validate(req.payload, {abortEarly: false})
            if(error){
                return h.response(error.details).code(422)
            }

        const data = await userDetailsModel.findOne({ userEmail: email });

        if(!data || !(await  bcrypt.compare(password, data.password))){
            // throw Boom.unauthorized()
            return h.response([{message : 'Invalid email or password', path : ['authFail']}]).code(401)
        }

        req.cookieAuth.set({id : data._id})
        return {id : data._id}
}



module.exports = { login }