"use strict"

const Joi = require("@hapi/joi");
const debug = require("debug")("app:db");


exports.login =  (req,res,next)=> {
    console.log("Before Validating ===> ", req.body)
    const schema = Joi.object( {
        email: Joi.string().min(8).required(),
        password : Joi.string().min(6).required(),
    })

    const {error,value} = schema.validate(req.body)
    console.log("After validating",value)
    if(error){
        return createErrorResponse(res, error.details[0].message.replace(/['"]/g,''), 422);
    }
    return next();
}

exports.signup = (req, res, next) => {

    const schema = Joi.object( {
        email: Joi.string().min(8).required(),
        password : Joi.string().min(6).required(),
        name: Joi.string().min(3).required()
    })

    const {error,value} = schema.validate(req.body)
    console.log("After validating",value)
    if(error){
        return createErrorResponse(res, error.details[0].message.replace(/['"]/g,''), 422);
    }
    return next();
}