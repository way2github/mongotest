const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema and Model
const BookSchema = new Schema({
    title: { type: String, required: true },
    published: { type: Number, required: false }
});

const AuthorSchema = new Schema({
    name: { type: String, required: true },
    age: { type: Number, required: false },
    books: [BookSchema]
});

const Author = mongoose.model('author', AuthorSchema);

module.exports = Author;