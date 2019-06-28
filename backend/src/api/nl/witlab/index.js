const Router = require('koa-router');
const cas = require('./cas')
const witlab = new Router();

witlab.use('/cas', cas.routes());

module.exports = witlab;
