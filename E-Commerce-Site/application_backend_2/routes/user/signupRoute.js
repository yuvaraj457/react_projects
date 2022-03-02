const Boom  = require('@hapi/boom')
const bcrypt = require('bcrypt')
const Joi = require('joi')
const crypto = require('crypto')
const nodemailer = require('nodemailer')

const userDetailsModel = require('../../models/userModel')
const { schema } = require('../../validationSchema')

const getUserByToken =async (req, h) => {
    const {token} = req.payload
    console.log(token)
    try
    {
        const user = await userDetailsModel.findOne({emailVerificationToken : token})
        console.log(user)
        if(!user){
            return h.response('invalid user').code(404)
        }

        if(user.emailVerified){
            return h.response('email verified').code(200)
        }
        return h.response('email not verified').code(401)
    }
    catch(error){
        return error
    }
}

const emailVerification = async (req, h) => {
    const {email} = req.payload
    console.log(email)
    try{
        const token = crypto.randomBytes(20).toString('hex')

        const data = await userDetailsModel({emailVerificationToken : token, emailVerificationExpires : Date.now() + 3600000})

        data.save()

        const transporter = nodemailer.createTransport({
            host : 'smtp.gmail.com',
            service : 'gmail',
            port : 465,
            auth : {
                user : 'yuvarajraj477@gmail.com',
                pass : 'testmail123@'
            },
            tls : {
                rejectUnauthorized : false
            }
        })

        const mailOptions = {
            from : 'yuvarajraj477@gmail.com',
            to : email,
            subject : 'Link to change password',
            text : 'To verify your email.\n'
            +'please click below link in order to activate account.\n\n'
            +`http://localhost:3000/emailVerification/${token}`
        }

        transporter.sendMail(mailOptions, (err, res) => {
            if(err){
                console.log(err)
                return err
            }
            else{
                console.log('mail sent')
                return h.response(token)  
            }
        })
        return h.response(token).code(200)
    }
    catch(error){
        return error
    }
}

const verifyUserViaEmail = async (req, h) => {
    const {token} = req.payload
    try{
        const user = await userDetailsModel.findOne({emailVerificationToken : token, emailVerificationExpires : {$gt : Date.now() }})
        
        if(!user){
            return h.response('Invalid token').code(401)
        }

        await userDetailsModel.updateOne(
            {emailVerificationToken : token},
            {$set : {emailVerified : true}}
        )

        return h.response('valid token').code(200)
    }
    catch(error){
        return error
    }
}


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

module.exports = {signup, emailVerification, verifyUserViaEmail, getUserByToken}