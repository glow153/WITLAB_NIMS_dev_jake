const Router = require('koa-router');
const nl = require('./nl');
const weather = require('./weather');

const api = new Router();

api.use('/nl', nl.routes());
api.use('/weather', weather.routes());

module.exports = api;