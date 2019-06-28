const Router = require('koa-router');
const witlab = require('./witlab');

const weather = new Router();

weather.use('/witlab', witlab.routes());

module.exports = weather;
