const Router = require('koa-router');
const casCtrl = require('./cas.ctrl');
const cas = new Router();

cas.post('/', casCtrl.root);
cas.get('/test', casCtrl.test);
cas.get('/health', casCtrl.health);
cas.post('/stream', casCtrl.stream);
cas.post('/stream_ird', casCtrl.stream_ird);
cas.post('/stream_file', casCtrl.stream_file);
cas.post('/stream_simple', casCtrl.stream_simple);

module.exports = cas;
