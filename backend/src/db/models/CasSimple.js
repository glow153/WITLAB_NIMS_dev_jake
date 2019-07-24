const mongoose = require('mongoose');
const { Schema } = mongoose;

const casSimpleSchema = new Schema({
 }, { collection: 'cas_simple' });


casSimpleSchema.statics.insertPost = async function (obj){
    const post = new this(obj)
    return post.save()
}

module.exports = mongoose.model('cas_simple', casSimpleSchema);