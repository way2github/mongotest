'use strict';

const mocha = require('mocha');
//const {ObjectId} = require('mongodb');
const { assert } = require('chai');
const mongoose = require('mongoose');
const Author = require('../models/authors');
mongoose.Promise = global.Promise;

before((done) => {
    mongoose.connect('mongodb://localhost:27017/test_author', { useNewUrlParser: true });
    mongoose.connection.once('open', () => {
        console.log('connection has been made!');
        done();
    }).on('error', (err) => {
        console.log('connection error: ', err)
    });
});

describe('Nesting records', () => {
    it('should add author record', (done) => {
        var author = new Author({
            name: 'Saadat Hasan Manto',
            age: 42,
            books: [
                { title: 'Tahira Se Tahir', published: 1971 },
                { title: 'Manto Ki Behtareen Kahanian', published: 1963 },
                { title: 'Shaiytan (Satan)', published: 1955 }
            ]
        });
        author.save().then(() => {
            Author.findOne({ name: 'Saadat Hasan Manto' })
                .then(
                    (res) => { assert.equal(res.books.length, 3); done(); })
                .catch((err) => done(err));
        });
    });
});