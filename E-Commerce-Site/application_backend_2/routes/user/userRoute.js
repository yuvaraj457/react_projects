require('dotenv').config()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const crypto = require('crypto')

const userDetailsModel = require('../../models/userModel')
const { addressFormSchema, changePasswordSchema, forgotPasswordSchema } = require('../../validationSchema')
const tokenModel = require('../../models/tokenModel')


const getUser = async(req, h) => {
    // const {sid} = req.state
    const {_id} = req.auth.credentials
    const user = await userDetailsModel.findOne({_id }).select(['-_id', '-password', '-__v', '-resetPasswordToken', '-resetPasswordExpires'])
    return h.response(user).code(200)
}

const refreshToken = async (req, h) => {
    const refreshToken = req.state
   
    if(!refreshToken){
        return h.response('token missing').code(403)
    }

    const {token} = await tokenModel.findOne({token : refreshToken['refresh_token']})
    const user = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET)

    if(!user){
        return h.response('token expired').code(403)    
    }

    const accessToken = jwt.sign({_id:user._id}, process.env.ACCESS_TOKEN_SECRET, {expiresIn:"1m"})

    // return accessToken
    // return h.response('token reloaded').state('access_token', accessToken, {ttl : 40* 1000})
    return h.response({accessToken})
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
        return error
    }
}

const resetPasswordViaEmailToken = async (req, h) => {
    const {_id, newPassword} = req.payload

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
        return error
    }
}

const logout = async (req, h) => {
    return h.response('Bye').unstate('refresh_token')
}

module.exports = {getUser, editPhone, editAddress, activeAddress, logout, deleteAddress, authenticate, changePassword, forgotPassword, resetPassword, resetPasswordViaEmailToken, refreshToken}