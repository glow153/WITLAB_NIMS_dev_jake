const CasSimpleEntry = require('db/models/CasSimple')
const Cas = require('db/models/Cas')
const CasIrd = require('db/models/CasIrd')
const CasSimple = require('db/models/CasSimple')
const dbg = require('lib/dbg')

const Joi = require('joi')
const moment = require('moment')
require('moment-timezone')
moment.tz.setDefault("Asia/Seoul")
// const multer = require('multer')
// const fs = require('fs')

exports.root = async ctx => {
    // debug print  
    dbg.request_log(ctx)

    // 스키마 검사
    const schema4check = {
        dt_start: Joi.string().required(),
        dt_end: Joi.string().required(),
        attribs: Joi.array().required()
    }

    const validate = Joi.validate(ctx.request.body, schema4check)

    if(validate.error) {
        dbg(`error: invalid req body`)
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

    JSON.parse(JSON.stringify(entries)).forEach((entry) => {

        entrySetX.push(moment(entry.datetime));
        // entrySetX.push(moment(entry.datetime).format("HH:mm"));
        entrySetY.push(Math.round(entry.illum));
    })

    ctx.body = dataSet

}

exports.test = async ctx => {
    // debug print  
    dbg.request_log(ctx)
    ctx.body = "ok";
}

exports.health = async ctx => {
    // debug print  
    dbg.request_log(ctx)
    
    const latest = await Cas.find().sort({'datetime': -1}).limit(1)  // get latest doc
    
    var obj_health = {
        'status': 0,  // 0: dead, 1: alive
        'latest_time': moment(latest[0].datetime).tz('Asia/Seoul')
                                                 .format('YYYY-MM-DD HH:mm:ss')
    }
    
    var diff = Math.abs(new Date() - latest[0].datetime)  // calc interval
    // 만약 CAS측정이 1분 20초 동안 이루어지지 않았다면 장치측정이 멈춘 것으로 간주
    if (diff > 80000){
        obj_health.status = 0
    } else {
        obj_health.status = 1
    }

    ctx.body = obj_health
}

exports.stream = async ctx => {
    dbg.request_log(ctx)

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
        dbg(`error: invalid req body`)
        ctx.status = 400
        ctx.body = validate.error
        return
    }

    const { datetime, data } = ctx.request.body

    let post = null
    try {
        post = await Cas.insertPost({datetime, data})
    } catch (e) {
        ctx.throw(e, 500)
    }

    ctx.body = {result: 1}
}

exports.stream_ird = async ctx => {
    dbg.request_log(ctx)

    // 스키마 검사
    const schema4check = {
        datetime: Joi.string().required(),
        sp_ird: Joi.object().required()
    }

    const validate = Joi.validate(ctx.request.body, schema4check)

    if(validate.error) {
        dbg(`error: invalid req body`)
        ctx.status = 400
        ctx.body = validate.error
        return
    }

    const { datetime, sp_ird } = ctx.request.body

    let post = null
    try {
        post = await CasIrd.insertPost({datetime, sp_ird})
    } catch (e) {
        ctx.throw(e, 500)
    }

    ctx.body = {result: 1}
}

exports.stream_file = async ctx => {
    dbg.request_log(ctx)

    // 스키마 검사
    const schema4check = {
        file: Joi.file().required()
    }

    const validate = Joi.validate(ctx.request.body, schema4check)

    if(validate.error) {
        dbg(`error: invalid req body`)
        ctx.status = 400
        ctx.body = validate.error
        return
    }

    
    // save received file
    fs.readFile(ctx.req.files.uploadFile.path, async (error, data) => {
        var date = '20190717'
        var filePath = `/home/witlab/dw/raw/${date}/${ctx.req.files.uploadFile.name}`
        fs.writeFile(filePath, data, function(error) {
            if (error) {
                throw error;
            } else {
                //
            }
        })
    })
    

    ctx.body = {result: 1}
}

exports.stream_simple = async ctx => {
    dbg.request_log(ctx)

    // 스키마 검사
    // const schema4check = {
    //     datetime: Joi.string().required(),
    //     file_abs_path: Joi.string().required(),
    //     file_name: Joi.string().required(),
    //     integration_time: Joi.number().required(),
    //     ccd_temp: Joi.number().required(),
    //     bird_all: Joi.number().required(),
    //     illum: Joi.number().required(),
    //     cas_uva: Joi.number().required(),
    //     cas_uvb: Joi.number().required(),
    //     cas_uvc: Joi.number().required(),
    //     bird_vis: Joi.number().required(),
    //     tri_x: Joi.number().required(),
    //     tri_y: Joi.number().required(),
    //     tri_z: Joi.number().required(),
    //     color_co_x: Joi.number().required(),
    //     color_co_y: Joi.number().required(),
    //     color_co_z: Joi.number().required(),
    //     color_co_u: Joi.number().required(),
    //     peak_wl: Joi.number().required(),
    //     cent_wl: Joi.number().required(),
    //     domi_wl: Joi.number().required(),
    //     cct: Joi.number().required(),
    //     cri: Joi.number().required(),
    //     lwr: Joi.number().required(),
    //     mwr: Joi.number().required(),
    //     swr: Joi.number().required(),
    //     narr: Joi.number().required(),
    //     auv: Joi.number().required(),
    //     duv: Joi.number().required(),
    //     euv: Joi.number().required(),
    //     euva: Joi.number().required(),
    //     euva_ratio: Joi.number().required(),
    //     euvb: Joi.number().required(),
    //     euvb_ratio: Joi.number().required(),
    //     tuv: Joi.number().required(),
    //     uva: Joi.number().required(),
    //     uvb: Joi.number().required(),
    //     uvi: Joi.number().required(),
    // }

    // const validate = Joi.validate(ctx.request.body, schema4check)

    // if(validate.error) {
    //     dbg(`error: invalid req body`)
    //     ctx.status = 400
    //     ctx.body = validate.error
    //     return
    // }

    let post = null
    try {
        post = await CasSimple.insertPost(ctx.request.body)
    } catch (e) {
        ctx.throw(e, 500)
    }

    ctx.body = {result: 1}
}
