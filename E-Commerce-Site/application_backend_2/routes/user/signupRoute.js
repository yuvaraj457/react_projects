const Boom  = require('@hapi/boom')
const bcrypt = require('bcrypt')
const userDetailsModel = require('../../models/userModel')

const signup = async(req, h) => {
        const {email, firstName, lastName, password} = req.payload
        try{
        const hashedPassword =  await bcrypt.hash(password, 10)
        const data = await userDetailsModel({
            firstName,
            lastName,
            email,
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