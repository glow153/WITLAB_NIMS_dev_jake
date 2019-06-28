const Router = require('koa-router');
var dateFormat = require('dateformat');
const kma_uvi = new Router();

kma_uvi.get('/test', async ctx => {
    // debug print
    dt_fmtstr = dateFormat(new Date(), 'yyyy-mm-dd HH:MM:ss')
    console.log(`${dt_fmtstr}>> ${ctx.req.method} -> ${ctx.req.url} :: headers:${JSON.stringify(ctx.headers)}`);
    console.log(`query string :: ${JSON.stringify(ctx.querystring)}`)

    ctx.body = "kma uvi api test";
});

module.exports = kma_uvi;
