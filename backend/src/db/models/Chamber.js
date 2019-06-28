const mongoose = require('mongoose')
const { Schema } = mongoose

const Chamber = new Schema({
    datetime: String,
    temp: Number,
    humi: Number
}, { collection: 'chamber_temphumi' })

Chamber.statics.insertPost = async function({ datetime, temp, humi }) {
    const post = new this({ datetime, temp, humi })
    // console.log(post);
    return post.save()
}

module.exports = mongoose.model('chamber_temphumi', Chamber)
