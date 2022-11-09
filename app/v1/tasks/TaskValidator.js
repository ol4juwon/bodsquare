"use strict"

const Joi = require("@hapi/joi");
const debug = require("debug")("app:db");


exports.create =  (req,res,next)=> {
    console.log("Before Validating ===> ", req.body)
    const schema = Joi.object( {
        title: Joi.string().min(3).required(),
        description : Joi.string().min(6).required(),
        time: Joi.string().required(),
        status: Joi.string().required(),
        user_id: Joi.string().required()
    })

    const {error,value} = schema.validate(req.body)
    console.log("After validating",value)
    if(error){
        return createErrorResponse(res, error.details[0].message.replace(/['"]/g,''), 422);
    }
    return next();
}

exports.update = (req, res, next) => {

    const schema = Joi.object( {
        id: Joi.string().min(8).required(),
        uid: Joi.string().min(8).required()
    })
console.log("Before Validating ===> ", req.params)
    const {error,value} = schema.validate(req.params)
    console.log("After validating",value)
    if(error){
        return createErrorResponse(res, error.details[0].message.replace(/['"]/g,''), 422);
    }
    return next();
}
exports.delete =   (req, res, next) => {

    const schema = Joi.object( {
        id: Joi.string().min(8).required(),
        uid: Joi.string().min(8).required()
    })
console.log("Before Validating ===> ", req.params)
    const {error,value} = schema.validate(req.params)
    console.log("After validating",value)
    if(error){
        return createErrorResponse(res, error.details[0].message.replace(/['"]/g,''), 422);
    }
    return next();
}
exports.getOne = (req, res, next) => {
    const schema = Joi.object( {
        id: Joi.string().min(8).required(),
    })

    const {error,value} = schema.validate(req.query)
    console.log("After validating",value)
    if(error){
        return createErrorResponse(res, error.details[0].message.replace(/['"]/g,''), 422);
    }
    return next();

}
exports.getAll = (req, res, next) => {
    const schema = Joi.object( {
        page: Joi.number().min(1).required(),
        limit: Joi.number().min(1).required(),
    })

    const {error,value} = schema.validate(req.query)
    console.log("After validating",value)
    if(error){
        return createErrorResponse(res, error.details[0].message.replace(/['"]/g,''), 422);
    }
    return next();
}
