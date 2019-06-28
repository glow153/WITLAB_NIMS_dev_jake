const mongoose = require('mongoose');
const { Schema } = mongoose;

const casEntryStreamSchema = new Schema({
    datetime: String,
    data: {
        general_information: {},
        measurement_conditions: {},
        results: {},
        uv: {}
    },
}, { collection: 'cas_stream_test' });


casEntryStreamSchema.statics.insertPost = async function ({datetime, data}){
    const post = new this({datetime, data})
    return post.save()
}

module.exports = mongoose.model('cas_stream_test', casEntryStreamSchema);
