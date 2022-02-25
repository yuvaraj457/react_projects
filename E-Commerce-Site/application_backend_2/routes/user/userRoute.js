const bcrypt = require('bcrypt')
const nodemailer = require('nodemailer')
const crypto = require('crypto')

require('dotenv').config()
const userDetailsModel = require('../../models/userModel')
const { addressFormSchema, changePasswordSchema, forgotPasswordSchema } = require('../../validationSchema')


const getUser = async(req, h) => {
    const {sid} = req.state
    const user = await userDetailsModel.findOne({_id : sid}).select(['-_id', '-password', '-__v', '-resetPasswordToken', '-resetPasswordExpires'])
    return h.response(user).code(200)
}

const authenticate = async (req, h) => {
    return h.response('Authenticated').code(200)
}

const editPhone = async(req, h) => {
    const {phone} = req.payload
    const {sid} = req.state
    try{
       await userDetailsModel.updateMany(
            {_id : sid},
            {
                $set : {'phone' : phone}
            }
        )
        return h.response('updated').code(200)
    }
    catch(error){
        return error
    }
}

const editAddress = async(req, h) => {
    const address = req.payload
    const {sid} = req.state

    const {value, error} = addressFormSchema.validate(req.payload, {abortEarly: false})
            if(error){
                return h.response(error.details).code(422)
            }

    try{
        await userDetailsModel.updateMany(
            {_id : sid},
            {
                $addToSet : {address}
            }
        )
        return h.response('updated').code(200)
    }
    catch(error){
        return error
    }

}

const activeAddress = async (req, h) => {
    const {activeAddress} = req.payload
    const {sid} = req.state
    try{
       await userDetailsModel.updateMany(
            {_id : sid},
            {
                $set : {activeAddress}
            }
        )
        return h.response('updated').code(200)
    }
    catch(error){
        return error
    }
}

const deleteAddress = async (req, h) => {
    const {address} = req.payload
    const {sid} = req.state

    try{
        await userDetailsModel.updateMany(
             {_id : sid},
             {
                $pull : {address}
             }
         )

        const user = await userDetailsModel.findOne({_id:sid})
         if(!(user.address.length > 0)){
            await userDetailsModel.updateMany(
                {_id : sid},
                {
                   $set : {activeAddress : '-'}
                }
            )
        }
        
         return h.response('Deleted Successfully').code(200)
     }
     catch(error){
         return error
     }
}

const changePassword = async (req, h) => {
    const {currentPassword, newPassword} = req.payload
    const {sid} = req.state

    const {value, error} = changePasswordSchema.validate(req.payload, {abortEarly: false})

    if(error){
        return h.response(error.details).code(422)
    }

    try{
        const data = await userDetailsModel.findOne({_id : sid})

        if(!data || !(await  bcrypt.compare(currentPassword, data.password))){
            return h.response([{message : 'Invalid current password', path : ['invalidPassword']}]).code(401)
        }

        const hashedPassword =  await bcrypt.hash(newPassword, 10)

        await userDetailsModel.updateOne(
            {_id : sid},
            {$set: {password : hashedPassword}}
          )
        return h.response('password changed successfully').code(200)
    }
    catch(error){
        return error
    }
    
}

const forgotPassword = async(req, h) => {
    const {email} = req.payload
    try{
        const data = await userDetailsModel.findOne({email})
        if(!data){
            // return h.response([{message : 'you not registered to this email', path : ['invalidEmail']}]).code(404)
            return h.response('you not registered to this email').code(404)
        }
        const token = crypto.randomBytes(20).toString('hex')
        await userDetailsModel.updateOne(
            {email},
            {$set : {resetPasswordToken : token, resetPasswordExpires : Date.now() + 3600000}}
        )

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
            text : 'You requested for password reset for your  creatives account.\n'
            +'please click below link in order to reset your password.\n\n'
            +`http://localhost:3000/resetPassword/${token}`
        }

        console.log('sending email...')

        transporter.sendMail(mailOptions, (err, res) => {
            if(err){
                console.log(err)
                return err
            }
            else{
                console.log('mail sent')
            }
        })
        return h.response({id : data._id, message : 'recovery email sent'}).code(200)
    }

    catch(error){
        return error
    }
}

const resetPassword = async (req, h) => {
    const {token} = req.payload
    try{
        const user = await userDetailsModel.findOne({resetPasswordToken : token, resetPasswordExpires : {$gt : Date.now() }})
        if(!user){
            return h.response('Invalid token').code(401)
        }
        return 'valid token'
    }
    catch(error){
    }
}

const resetPasswordViaEmailToken = async (req, h) => {
    const {_id, newPassword, retypedNewPassword} = req.payload
    
    const {value, error} = forgotPasswordSchema.validate(req.payload, {abortEarly: false})

    if(error){
        return h.response(error.details).code(422)
    }

    const hashedPassword =  await bcrypt.hash(newPassword, 10)

    try{
        await userDetailsModel.updateOne(
            {_id},
            {$set : {password : hashedPassword }}
        )
        return h.response('password reset successfull, you can login now')
    }
    catch(error){

    }
}

const logout = async (req, h) => {
    return h.response('Bye').unstate('sid')
}

module.exports = {getUser, editPhone, editAddress, activeAddress, logout, deleteAddress, authenticate, changePassword, forgotPassword, resetPassword}