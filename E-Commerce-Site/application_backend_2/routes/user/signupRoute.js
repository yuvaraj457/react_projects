const Boom  = require('@hapi/boom')
const bcrypt = require('bcrypt')
const Joi = require('joi')
const userDetailsModel = require('../../models/userModel')
const { schema } = require('../../validationSchema')

const signup = async(req, h) => {
        const {email, firstName, lastName, phone, password} = req.payload
        try{
            const {value, error} = schema.validate(req.payload, {abortEarly: false})
            if(error){
                return h.response(error.details).code(422)
            }

            const user = await userDetailsModel.findOne({email})
            if(user){
                return h.response([{message : "User already exists", path : ['email']}]).code(422)
            }
            
            const hashedPassword =  await bcrypt.hash(password, 10)
            const data = await userDetailsModel({
                firstName,
                lastName,
                email,
                phone,
                password : hashedPassword
            })
                data.save()
                return h.response('Successfully registered').code(201)
        }
        catch(error){
            throw Boom.unauthorized(error)
        }   
}

module.exports = {signup}