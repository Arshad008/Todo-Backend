var Joi = require('Joi');
const {
    model, 
    validationSchema
} = require ('../data/model/Todo');
const {
    jsonHeader,
    successResponse,
    invalidParameterResponse,
    errorResponse
} = require('../responseHelper');

module.exports = {
    create: function(req,res){
        jsonHeader(res);

        let {error, value} = Joi.validate(req.body, validationSchema);
        if(error){
            invalidParameterResponse({}, error.message, res);
            return;
        }

        let newTodo = new model(value);
        newTodo.save()
        .then((result)=>successResponse(result, res))
        .catch(err=>errorResponse({}, err.message, res));
    },
    getAll: function(req,res){
        jsonHeader(res);

        model.find()
        .then((result)=>successResponse(result,res))
        .catch(err=>errorResponse({}, err.message,res));
    }
}