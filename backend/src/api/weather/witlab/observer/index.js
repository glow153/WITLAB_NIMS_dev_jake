const Router = require('koa-router');
const ctrl = require('./observer.ctrl');
const observer = new Router();

observer.post('/insert', ctrl.insert);
observer.post('/stream', ctrl.stream);
observer.get('/test', ctrl.test);

module.exports = observer;
