const chalk = require('chalk');
const Moment = require('moment');

function getTime() {
    const now = new Moment();
    const time = chalk.dim(`[${now.format('YYYY-MM-DD HH:mm:ss')}]`);
    return time;
}

function log(...message) {
    const time = getTime();
    const type = chalk.bold('[LOG]');

    console.log(`${time}${type}`, ...message);
}

log.request_log = (ctx) => {
    const ip = ctx.req.connection.remoteAddress
    const method = ctx.req.method
    const target = ctx.req.url
    log(`${ip}: ${method} ${target}>> body :: ${JSON.stringify(ctx.request.body).substr(0, 50)}...`)
}


log.info = (...message) => {
    const time = getTime();
    const type = chalk.bold(chalk.cyan('[INFO]'));
    console.info(`${time}${type}`, ...message);
};

log.error = (...message) => {
    const time = getTime();
    const type = chalk.bold(chalk.red('[ERROR]'));
    console.error(`${time}${type}`, ...message);
};

module.exports = log;