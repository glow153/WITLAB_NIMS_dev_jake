const Joi = require('joi')
const Chamber = require('db/models/Chamber')
const dbg = require('lib/dbg')


exports.latest = async ctx => {
    // debug print  
    dbg.request_log(ctx)
    ctx.body = await Chamber.find().limit(10)
}




exports.insert = async ctx => {
    // debug print
    dbg.request_log(ctx)

    // 스키마 검사
    const schema4check = {
        datetime: Joi.string().required(),
        temp: Joi.number().required(),
        humi: Joi.number().required()
    }

    const validate = Joi.validate(ctx.request.body, schema4check)

    if(validate.error) {
        dbg(`error: invalid req body`)
        ctx.status = 400
        ctx.body = validate.error
        return
    }
    
    const { datetime, temp, humi } = ctx.request.body

    let post = null
    try {
        post = await Chamber.insertPost({datetime, temp, humi})
        
    } catch (e) {
        ctx.throw(e, 500)
    }

    ctx.body = { content: `${post.datetime}, ${post.temp}, ${post.humi}`, result: 1 }
}




exports.test = async ctx => {
    // debug print
    dbg.request_log(ctx)
    ctx.body = "ok"
}
