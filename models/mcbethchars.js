const mongoose= require('mongoose');
const Schema = mongoose.Schema;

// Create Schema and Model
const McBethSchema = new Schema({
    name: String,
    age: Number
});

const McBethChar = mongoose.model('mcbethchar', McBethSchema);

module.exports = McBethChar;