const Router = require('koa-router');
const ctrl = require('./chamber.ctrl');
const chamber = new Router();

chamber.get('/latest', ctrl.latest);
chamber.post('/', ctrl.insert);
chamber.get('/test', ctrl.test);

module.exports = chamber;
