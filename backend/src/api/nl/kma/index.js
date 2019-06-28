const Router = require('koa-router');
const uvi = require('./uvi');

const kma = new Router();

kma.use('/uvi', uvi.routes());

module.exports = kma;
