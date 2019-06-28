const Router = require('koa-router');
const casCtrl = require('./cas.ctrl');
const cas = new Router();

cas.get('/', casCtrl.root);
cas.get('/test', casCtrl.test);
cas.post('/stream', casCtrl.stream);
cas.post('/stream_ird', casCtrl.stream_ird);
cas.post('/stream_file', casCtrl.stream_file);

module.exports = cas;
