const { createCustomer, updateCustomer } = require('../../src/controllers/customerController');
const td = require('testdouble');

describe('Customer Controller', () => {
    it('should create a new customer', async () => {
        const ctx = { request: { body: { name: 'John Doe', email: 'john@example.com' } }, body: null, status: null };
        await createCustomer(ctx);
        expect(ctx.status).to.equal(201);
        expect(ctx.body).to.include({ name: 'John Doe', email: 'john@example.com' });
    });

    it('should fail for invalid data', async () => {
        const ctx = { request: { body: { name: '' } }, body: null, status: null };
        await createCustomer(ctx);
        expect(ctx.status).to.equal(400);
    });
});