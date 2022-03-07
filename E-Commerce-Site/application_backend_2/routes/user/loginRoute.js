require('dotenv').config()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Boom = require('@hapi/boom')

const userDetailsModel = require('../../models/userModel');
const tokenModel = require('../../models/tokenModel')
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

        const refreshToken = jwt.sign({_id:data._id}, process.env.REFRESH_TOKEN_SECRET, {expiresIn: "1d"})
        const accessToken = jwt.sign({_id:data._id}, process.env.ACCESS_TOKEN_SECRET)

        await new tokenModel({token : refreshToken}).save()

        // req.cookieAuth.set(data._id)

        h.state('refresh_token' , refreshToken)
        // h.state('access_token', accessToken, {ttl : 40* 1000})


        return h.response({accessToken})
}



module.exports = { login }