const Joi = require("joi")
const JoiPassword  = require("joi-password")

const schema = Joi.object({
    firstName : Joi.string().required(),
    lastName  : Joi.string().required(),
    email : Joi.string().email().required(),
    phone : Joi.string().required(),
    password : JoiPassword
                        .string()
                        .minOfSpecialCharacters(1)
                        .minOfLowercase(1)
                        .minOfUppercase(1)
                        .minOfNumeric(1)
                        .noWhiteSpaces()
                        .required(),

    confirmPassword : Joi.any().valid(Joi.ref('password')).required().options({ language: { any: { allowOnly: 'must match password' } } })
})

module.exports = {schema}