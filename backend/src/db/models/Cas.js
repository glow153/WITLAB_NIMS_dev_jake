const mongoose = require('mongoose');
const { Schema } = mongoose;

const casEntrySchema = new Schema({
    datetime: String,
    data: {
        general_information: {},
        measurement_conditions: {},
        results: {},
        uv: {}
    },
}, { collection: 'cas' });


casEntrySchema.statics.insertPost = async function ({datetime, data}){
    const post = new this({datetime, data})
    return post.save()
}

module.exports = mongoose.model('cas', casEntrySchema);