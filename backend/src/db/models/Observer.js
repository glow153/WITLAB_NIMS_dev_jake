const mongoose = require('mongoose');
const { Schema } = mongoose;

const observerEntrySchema = new Schema({
    datetime: Date,
    Temp_Out: Number,
    Hi_Temp: Number,
    Low_Temp: Number,
    Out_Hum: Number,
    Dew_Pt: Number,
    Wind_Speed: Number,
    Wind_Dir: String,
    Wind_Run: Number,
    Hi_Speed: Number,
    Hi_Dir: String,
    Wind_Chill: Number,
    Heat_Index: Number,
    THW_Index: Number,
    THSW_Index: String,
    Bar: Number,
    Rain: Number,
    Rain_Rate: Number,
    Solar_Rad: Number,
    Solar_Energy: Number,
    Hi_Solar_Rad: Number,
    UV_Index: Number,
    UV_Dose: Number,
    Hi_UV: Number,
    Heat_D_D: Number,
    Cool_D_D: Number,
    In_Temp: Number,
    In_Hum: Number,
    In_Dew: Number,
    In_Heat: Number,
    In_EMC: Number,
    In_Air_Density: Number,
    ET: Number,
    Wind_Samp: Number,
    Wind_Tx: Number,
    ISS_Recept: Number,
    Arc_Int: Number
}, { collection: 'weather' });


observerEntrySchema.statics.insertPost = async function (entry){
    const post = new this(entry)
    return post.save()
}

module.exports = mongoose.model('weather', observerEntrySchema);
