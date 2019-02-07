const mongoose = require('mongoose');
const Joi = require('joi');

const TodoModel = mongoose.model('Todo', {
    title: {type: String, required: true},
    description: {type: String},
    tag: {type:String},
    addedOn: {type: Number, required: true}
});

const TodoValidationSchema = Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().optional(),
    tag: Joi.string().optional(),
    addedOn: Joi.number().required()
});

module.exports = {
    model: TodoModel,
    validationSchema: TodoValidationSchema
}