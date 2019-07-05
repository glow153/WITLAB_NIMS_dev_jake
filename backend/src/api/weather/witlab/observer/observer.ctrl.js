const Joi = require('joi')
const Observer = require('db/models/Observer')
const dbg = require('lib/dbg')

exports.insert = async ctx => {
    // debug print
    dbg.request_log(ctx)

    // 스키마 검사
    const schema4check = {
        datetime: Joi.string().required(),
        Temp_Out: Joi.number().required(),
        Hi_Temp: Joi.number().required(),
        Low_Temp: Joi.number().required(),
        Out_Hum: Joi.number().required(),
        Dew_Pt: Joi.number().required(),
        Wind_Speed: Joi.number().required(),
        Wind_Dir: Joi.string().required(),
        Wind_Run: Joi.number().required(),
        Hi_Speed: Joi.number().required(),
        Hi_Dir: Joi.string().required(),
        Wind_Chill: Joi.number().required(),
        Heat_Index: Joi.number().required(),
        THW_Index: Joi.number().required(),
        THSW_Index: Joi.string().required(),
        Bar: Joi.number().required(),
        Rain: Joi.number().required(),
        Rain_Rate: Joi.number().required(),
        Solar_Rad: Joi.number().required(),
        Solar_Energy: Joi.number().required(),
        Hi_Solar_Rad: Joi.number().required(),
        UV_Index: Joi.number().required(),
        UV_Dose: Joi.number().required(),
        Hi_UV: Joi.number().required(),
        Heat_D_D: Joi.number().required(),
        Cool_D_D: Joi.number().required(),
        In_Temp: Joi.number().required(),
        In_Hum: Joi.number().required(),
        In_Dew: Joi.number().required(),
        In_Heat: Joi.number().required(),
        In_EMC: Joi.number().required(),
        In_Air_Density: Joi.number().required(),
        ET: Joi.number().required(),
        Wind_Samp: Joi.number().required(),
        Wind_Tx: Joi.number().required(),
        ISS_Recept: Joi.number().required(),
        Arc_Int: Joi.number().required()
    }

    const validate = Joi.validate(ctx.request.body, schema4check)

    if(validate.error) {
        dbg.error(`invalid req body: `, JSON.stringify(ctx.request.body))
        ctx.status = 400
        ctx.body = validate.error
        return
    }
    
    ctx.body = {result: 'VALID body! but insertion process has NOT been implemented yet :('}
}

exports.stream = async ctx => {
    // debug print
    dbg.request_log(ctx)

    // 스키마 검사
    const schema4check = {
        datetime: Joi.string().required(),
        Temp_Out: Joi.number().required(),
        Hi_Temp: Joi.number().required(),
        Low_Temp: Joi.number().required(),
        Out_Hum: Joi.number().required(),
        Dew_Pt: Joi.number().required(),
        Wind_Speed: Joi.number().required(),
        Wind_Dir: Joi.string().required(),
        Wind_Run: Joi.number().required(),
        Hi_Speed: Joi.number().required(),
        Hi_Dir: Joi.string().required(),
        Wind_Chill: Joi.number().required(),
        Heat_Index: Joi.number().required(),
        THW_Index: Joi.number().required(),
        THSW_Index: Joi.string().required(),
        Bar: Joi.number().required(),
        Rain: Joi.number().required(),
        Rain_Rate: Joi.number().required(),
        Solar_Rad: Joi.number().required(),
        Solar_Energy: Joi.number().required(),
        Hi_Solar_Rad: Joi.number().required(),
        UV_Index: Joi.number().required(),
        UV_Dose: Joi.number().required(),
        Hi_UV: Joi.number().required(),
        Heat_D_D: Joi.number().required(),
        Cool_D_D: Joi.number().required(),
        In_Temp: Joi.number().required(),
        In_Hum: Joi.number().required(),
        In_Dew: Joi.number().required(),
        In_Heat: Joi.number().required(),
        In_EMC: Joi.number().required(),
        In_Air_Density: Joi.number().required(),
        ET: Joi.number().required(),
        Wind_Samp: Joi.number().required(),
        Wind_Tx: Joi.number().required(),
        ISS_Recept: Joi.number().required(),
        Arc_Int: Joi.number().required()
    }

    const validate = Joi.validate(ctx.request.body, schema4check)

    if(validate.error) {
        dbg.error(`invalid req body: `, JSON.stringify(ctx.request.body))
        ctx.status = 400
        ctx.body = validate.error
        return
    }
    
    const entry = ctx.request.body

    let post = null
    try {
        post = await Observer.insertPost(entry)
        
    } catch (e) {
        ctx.throw(e, 500)
    }

    ctx.body = {result: 1}
}

exports.test = async ctx => {
    // debug print  
    dbg.request_log(ctx)
    ctx.body = "ok"
}
