const Boom  = require('@hapi/boom')
const bcrypt = require('bcrypt')
const Joi = require('joi')
const userDetailsModel = require('../../models/userModel')
const { schema } = require('../../validationSchema')

const signup = async(req, h) => {
        const {email, firstName, lastName, phone, password, confirmPassword} = req.payload

        try{
        const { err, value } = Joi.validate(req.payload, schema)
        if(err){
            return h.response(err).code(422)
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