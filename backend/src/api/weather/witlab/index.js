const Router = require('koa-router');
const chamber = require('./chamber')
const witlab = new Router();

witlab.use('/chamber', chamber.routes());

module.exports = witlab;
