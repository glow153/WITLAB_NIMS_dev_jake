const Joi = require('joi')
const CasSimpleEntry = require('db/models/CasSimple');
const CasStreamTest = require('db/models/CasStreamTest')
const CasIrdStreamTest = require('db/models/CasIrdStreamTest')
const dbg_log = require('lib/dbg');
const moment = require('moment')

exports.root = async ctx => {
    // debug print  
    const ip = ctx.req.connection.remoteAddress
    const method = ctx.req.method
    const target = ctx.req.url
    dbg_log(`${ip}: ${method} ${target}>> body :: ${JSON.stringify(ctx.request.body).substr(0, 50)}...`)

    // 스키마 검사
    const schema4check = {
        dt_start: Joi.string().required(),
        dt_end: Joi.string().required(),
        attribs: Joi.array().required()
    }

    const validate = Joi.validate(ctx.request.body, schema4check)

    if(validate.error) {
        dbg_log(`error: invalid req body`)
        ctx.status = 400
        ctx.body = validate.error
        return
    }

    const { dt_start, dt_end, attribs } = ctx.request.body;

    var prj_attrib_str = `{"datetime":1`;

    attribs.forEach(element => {
        prj_attrib_str += `,"${element}":1`;
    });
    prj_attrib_str += `}`;

    const entries = await CasSimpleEntry.find({ "datetime": { "$gte": dt_start, "$lte": dt_end } }, JSON.parse(prj_attrib_str));

    // sehyun's code from here
    let entrySetX = [];
    let entrySetY = [];

    let dataSet = {
        X : entrySetX,
        Y : entrySetY
    };

    JSON.parse(JSON.stringify(entries)).forEach((element) => {

        entrySetX.push(moment(element.datetime));
        // entrySetX.push(moment(element.datetime).format("HH:mm"));
        entrySetY.push(Math.round(element.illum));
    })

    ctx.body = dataSet

}

exports.test = async ctx => {
    // debug print  
    const ip = ctx.req.connection.remoteAddress
    const method = ctx.req.method
    const target = ctx.req.url
    dbg_log(`${ip}: ${method} ${target}>> body :: ${JSON.stringify(ctx.request.body).substr(0, 50)}...`)

    ctx.body = "ok";
}

exports.stream = async ctx => {
    const ip = ctx.req.connection.remoteAddress
    const method = ctx.req.method
    const target = ctx.req.url
    dbg_log(`${ip}: ${method} ${target}>> body :: ${JSON.stringify(ctx.request.body).substr(0, 50)}...`)

    // 스키마 검사
    const schema4check = {
        datetime: Joi.string().required(),
        data: Joi.object({
            measurement_conditions: Joi.object().required(),
            results: Joi.object().required(),
            general_information: Joi.object().required(),
            uv:Joi.object().required()
        }).required()
    }

    const validate = Joi.validate(ctx.request.body, schema4check)

    if(validate.error) {
        dbg_log(`error: invalid req body`)
        ctx.status = 400
        ctx.body = validate.error
        return
    }

    const { datetime, data } = ctx.request.body

    let post = null
    try {
        post = await CasStreamTest.insertPost({datetime, data})
    } catch (e) {
        ctx.throw(e, 500)
    }

    ctx.body = {result: 1}
}

exports.stream_ird = async ctx => {
    const ip = ctx.req.connection.remoteAddress
    const method = ctx.req.method
    const target = ctx.req.url
    dbg_log(`${ip}: ${method} ${target}>> body :: ${JSON.stringify(ctx.request.body).substr(0, 50)}...`)

    // 스키마 검사
    const schema4check = {
        datetime: Joi.string().required(),
        sp_ird: Joi.object().required()
    }

    const validate = Joi.validate(ctx.request.body, schema4check)

    if(validate.error) {
        dbg_log(`error: invalid req body`)
        ctx.status = 400
        ctx.body = validate.error
        return
    }

    const { datetime, sp_ird } = ctx.request.body

    let post = null
    try {
        post = await CasIrdStreamTest.insertPost({datetime, sp_ird})
    } catch (e) {
        ctx.throw(e, 500)
    }

    ctx.body = {result: 1}
}


exports.stream_file = async ctx => {
    const ip = ctx.req.connection.remoteAddress
    const method = ctx.req.method
    const target = ctx.req.url
    dbg_log(`${ip}: ${method} ${target}>> body :: ${JSON.stringify(ctx.request.body).substr(0, 50)}...`)

    // 스키마 검사
    const schema4check = {
        file: Joi.file().required()
    }

    const validate = Joi.validate(ctx.request.body, schema4check)

    if(validate.error) {
        dbg_log(`error: invalid req body`)
        ctx.status = 400
        ctx.body = validate.error
        return
    }

    const { fileobj } = ctx.request.body
    
    fileobj
}

