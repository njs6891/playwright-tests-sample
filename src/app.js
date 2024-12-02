const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const customerRoutes = require('./routes/customer');
const { logger, logMiddleware } = require('./middlewares/logger');

const app = new Koa();

app.use(bodyParser());
app.use(logMiddleware);

app.use(customerRoutes.routes()).use(customerRoutes.allowedMethods());

app.on('error', (err, ctx) => {
    logger.error(`Server error: ${err.message}`, { ctx });
});

module.exports = app;