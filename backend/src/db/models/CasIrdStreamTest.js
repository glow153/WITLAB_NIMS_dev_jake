const mongoose = require('mongoose');
const { Schema } = mongoose;

const casSpIrdSchema = new Schema({
    datetime: Date,
    sp_ird: {}
}, { collection: 'cas_ird' });


casSpIrdSchema.statics.insertPost = async function ({datetime, sp_ird}){
    const post = new this({datetime, sp_ird})
    return post.save()
}

module.exports = mongoose.model('cas_ird_stream_test', casSpIrdSchema);
