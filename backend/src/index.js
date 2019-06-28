// load environment variables
require('dotenv').config();
const {
    PORT: port,
    MONGO_URI: mongoURI
} = process.env;

const Koa = require('koa');
const Router = require('koa-router');
const serve = require('koa-static');
const bodyParser = require('koa-bodyparser');
const compress = require('koa-compress');

const db = require('./db');
const api = require('./api');

db.connect();

// Koa 인스턴스 생성
const app = new Koa();

app.use((ctx, next) => {
    const allowedHosts = [
        'localhost',
    ];
    const origin = ctx.header['origin'];
    allowedHosts.every(el => {
        if (!origin) return false;
        if (origin.indexOf(el) !== -1) {
            ctx.response.set('Access-Control-Allow-Origin', origin);
            return false;
        }
        return true;
    });
    ctx.set('Access-Control-Allow-Credentials', true);
    ctx.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-timebase, Link');
    ctx.set('Access-Control-Allow-Methods', 'GET, POST, DELETE, PATCH, OPTIONS');
    ctx.set('Access-Control-Expose-Headers', 'Link');
    return next();
});

app.use(compress());
app.use(bodyParser());

const router = new Router();
router.get('/', (ctx, next) => {
    ctx.body = '<h1>WitLab NIMS Backend Server v1.0</h1>';
});
router.use('/api', api.routes());

app.use(router.routes());
app.use(router.allowedMethods());

app.use(serve('../build'));

app.listen(port, () => {
    console.log(`NIMS API server is listening to port ${port}`);
});
