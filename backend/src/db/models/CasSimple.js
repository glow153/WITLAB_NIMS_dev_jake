const mongoose = require('mongoose');
const { Schema } = mongoose;

const casSimpleEntrySchema = new Schema({}, { collection: 'cas_simple' });

module.exports = mongoose.model('cas_simple', casSimpleEntrySchema);