const Router = require('koa-router');
const observer = require('./observer')
const chamber = require('./chamber')
const witlab = new Router();

witlab.use('/observer', observer.routes());
witlab.use('/chamber', chamber.routes());

module.exports = witlab;
