require('dotenv').config()
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

        const data = await userDetailsModel.findOne({ email })

        if(!data || !(await  bcrypt.compare(password, data.password))){
            return h.response([{message : 'Invalid email or password', path : ['authFail']}]).code(401)
        }

        // const authToken = jwt.sign({_id:data._id}, process.env.TOKEN_SECRET)
        req.cookieAuth.set(data._id)

        return 'Login Successfully'
}



module.exports = { login }