const Joi = require('joi');
const { customerSchema } = require('../schemas/customer');

let customers = {};

exports.createCustomer = async (ctx) => {
    try {
        const { error, value } = customerSchema.validate(ctx.request.body);
        if (error) throw new Error(error.details[0].message);

        const id = Date.now().toString();
        const customer = { id, ...value };
        customers[id] = customer;

        ctx.status = 201;
        ctx.body = customer;
    } catch (err) {
        ctx.status = 400;
        ctx.body = { error: err.message };
    }
};

exports.updateCustomer = async (ctx) => {
    const { id } = ctx.params;
    if (!customers[id]) {
        ctx.status = 404;
        ctx.body = { error: 'Customer not found' };
        return;
    }

    const updateSchema = Joi.object({
        name: Joi.string().optional(),
        email: Joi.string().email().optional(),
    });

    try {
        const { error, value } = updateSchema.validate(ctx.request.body);
        if (error) throw new Error(error.details[0].message);

        customers[id] = { ...customers[id], ...value };
        ctx.body = customers[id];
    } catch (err) {
        ctx.status = 400;
        ctx.body = { error: err.message };
    }
};