const Router = require('koa-router');
const witlab = require('./witlab');
const kma = require('./kma');

const nl = new Router();

nl.use('/witlab', witlab.routes());
nl.use('/kma', kma.routes());

module.exports = nl;
