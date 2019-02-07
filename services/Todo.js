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
    getTodos: function(req,res){
        jsonHeader(res);

        model.find({status: "todo"})
        .then((result)=>successResponse(result,res))
        .catch(err=>errorResponse({}, err.message,res));
    },
    delete: function(req,res){
        jsonHeader(res);

        let id = req.params.id;

        model.findByIdAndDelete(id)
        .then((result)=>successResponse(result,res))
        .catch(err=>errorResponse({}, err.message,res));
    }
}