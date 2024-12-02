const Joi = require('joi');

exports.customerSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
});