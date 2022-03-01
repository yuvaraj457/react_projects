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

            const token = crypto.randomBytes(20).toString('hex')
            
            if(user){
                return h.response([{message : "User already exists", path : ['email']}]).code(422)
            }

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
                to : 'yuvarajraj457@gmail.com',
                subject : 'Link to change password',
                text : 'To verify your email.\n'
                +'please click below link in order to activate account.\n\n'
                +`http://localhost:3000/resetPassword/${token}`
            }

            transporter.sendMail(mailOptions, (err, res) => {
                if(err){
                    console.log(err)
                    return err
                }
                else{
                    console.log('mail sent')
                }
            })

            
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