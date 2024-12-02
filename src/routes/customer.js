const Router = require('koa-router');
const { createCustomer, updateCustomer } = require('../controllers/customerController');

const router = new Router({ prefix: '/customers' });

router.post('/', createCustomer);
router.put('/:id', updateCustomer);

module.exports = router;