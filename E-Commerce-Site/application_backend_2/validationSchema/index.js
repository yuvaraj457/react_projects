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

const addressFormSchema = Joi.object({
    'Plot no/House no' : Joi.number().required(),
    area : Joi.string().required(),
    locality : Joi.string().required(),
    state : Joi.string().required(),
    pincode : Joi.number().required()
})

const productUploadSchema = Joi.object({
    productName : Joi.string().required(),
    productMRP : Joi.number().required(),
    productPrice : Joi.number().required(),
    productDiscount : Joi.number().required(),
    productQuantity : Joi.number().required(),
    productStar : Joi.number().required(),
    productType : Joi.string().required(),
    productImage : Joi.string().required(),
    productThreeDView : Joi.string().required()
})

const changePasswordSchema = Joi.object({
    currentPassword : Joi.string().required(),
    newPassword : Joi.string().invalid(Joi.ref('currentPassword')).required().messages({ 'any.invalid': 'current password and new password should not be same' })
})

const forgotPasswordSchema = Joi.object({
    newPassword : Joi.string().required(),
    retypedNewPassword : Joi.any().equal(Joi.ref('newPassword')).required().label('retyped password').messages({ 'any.only': 'Password Mismatch' })
})

module.exports = {schema, loginSchema, addressFormSchema, productUploadSchema, changePasswordSchema, forgotPasswordSchema}