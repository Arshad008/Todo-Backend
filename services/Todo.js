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
    getFinishedTodos:function(req,res){
        jsonHeader(res);

        model.find({status: "finished"})
        .then((result)=>successResponse(result,res))
        .catch(err=>errorResponse({}, err.message,res));
    },
    delete: function(req,res){
        jsonHeader(res);

        let id = req.params.id;

        model.findByIdAndDelete(id)
        .then((result)=>successResponse(result,res))
        .catch(err=>errorResponse({}, err.message,res));
    },
    updateStatus: function(req,res){
        jsonHeader(res);
        let id = req.params.id;
        let params = req.body;
        model.findByIdAndUpdate(id, {status: params.status})
        .then((result)=>successResponse(result,res))
        .catch(err=>errorResponse({}, err.message,res));
    },
    update:function(req,res){
        jsonHeader(res);

        let id = req.params.id;
        let params = req.body;

        if(id != null || id != undefined){
            model.findByIdAndUpdate(id, {
                title: params.title,
                description: params.description,
                tag: params.tag.toLowerCase(),
                status: params.status,
                addedOn: params.addedOn
            }).then((result)=>successResponse(result,res))
            .catch(err=>errorResponse({}, err.message,res));
        }        
    },
    getAllTags: function(req,res){
        jsonHeader(res);
        let tag = req.params.tag;
        if(tag == "all"){
            model.find().select('tag -_id')
            .then((result)=>successResponse(result, res))
            .catch(err=>errorResponse({}, err.message, res));            
        }else{
            model.find({tag: tag}).select('tag -_id')
            .then((result)=>successResponse(result, res))
            .catch(err=>errorResponse({}, err.message, res));
        }
    }
}