const joi = require('joi');

const loginSchema = joi.object({
   user : joi.object({ 
    email: joi.string().required(),
    password: joi.string().required()
   }).required()
})

const registerSchema = joi.object({
    user :  joi.object({
        email: joi.string().required(),
        username : joi.string().required(),
        password: joi.string().required()
    }).required()

})

module.exports = {
    loginSchema,
    registerSchema
}