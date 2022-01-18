const Joi = require("joi")

const schema = Joi.object({
    firstName : Joi.string().required(),
    lastName  : Joi.string().required(),
    email : Joi.string().email().required(),
    phone : Joi.string().required(),
    password : Joi.string().regex(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{6,}$/).required().messages({'string.pattern.base' : 'password should be strong'}),
    confirmPassword : Joi.any().equal(Joi.ref('password')).required().label('confirm password').messages({ 'any.only': 'Password Mismatch' })
})

const loginSchema = Joi.object({
    email : Joi.string().email().required(),
    password : Joi.string().required()
})

module.exports = {schema, loginSchema}