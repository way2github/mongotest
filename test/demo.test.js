'use strict';

const mocha = require('mocha');
//const {ObjectId} = require('mongodb');
const { assert } = require('chai');
const mongoose = require('mongoose');
const McBethChar = require('../models/mcbethchars');
mongoose.Promise = global.Promise;

before((done) => {
    mongoose.connect('mongodb://localhost:27017/test_foobar', { useNewUrlParser: true });

    mongoose.connection.once('open', () => {
        console.log('connection has been made!');
        done();
    })
        .on('error', (err) => {
            console.log('connection error: ', err)
        });
});

before((done) => {
    mongoose.connection.collections.mcbethchars.drop();
    done();
});

// // Describe tests
// describe('Multiplication tests', () => {
//     //Create tests
//     it('should multiply two numbers', () => {
//         assert.equal(5 * 2, 10, '5*2 doesn\'t match with 10 - Test Failed!');
//     })
// });
var char;

describe('Record saving tests', () => {
    //Create tests
    // var new_id = new ObjectId().getTimestamp();
    // console.log('new_id: '+new_id);
    it('should save record to db', (done) => {
        char = new McBethChar({ name: 'McBeth', age: "29" });
        char.save().then(() => {
            assert(char.isNew === false);
            done();
        }).catch((err) => done(err));
    }).timeout(3000);
});

describe('Record finding tests', () => {
    //Create tests
    it('should find a record from db', (done) => {
        McBethChar.find({ name: 'McBeth' }).then((res) => {
            assert.equal(res[0].name, 'McBeth');
            done();
        }).catch((err) => done(err));
    }).timeout(3000);
    
    it('should find ONLY a record from db', (done) => {
        McBethChar.findOne({ _id: char._id }).then((res) => {
            //console.log(JSON.stringify(res, undefined, 2));
            assert.equal(res.name, 'McBeth');
            done();
        }).catch((err) => done(err));
    })
        .timeout(3000);
});

describe('Record updating tests', () => {
    //Create tests
    it('should update a record from db', (done) => {
        McBethChar.findOneAndUpdate({ name: 'McBeth' },
            { name: 'Luigi', age: 32 }).then((res) => {
                McBethChar.findOne({ name: 'Luigi' })
                    .then((res) => { assert.equal(res.name, 'Luigi'); done(); });
            }).catch((err) => done(err));
    }).timeout(3000);
});

describe('Record updating $inc tests', () => {
    it('should increment age', (done) => {
        McBethChar.updateOne({ $inc: { age: -1 } }).then(() => {
            McBethChar.findOne({ name: 'Luigi' })
                .then((res) => { assert.equal(res.age, 32); done(); })
                .catch((err) => done(err));
        }).catch((err) => done(err));
    });
});
/*
describe('Record deleting tests', () => {
    //Create tests
    it('should delete a record from db', (done) => {
        McBethChar.findOneAndRemove({ name: 'Luigi' }).then(
            () => {
                McBethChar.findOne({ name: 'Luigi' })
                    .then((res) => { assert(res !== null); done(); },
                        (err) => { console.log('Error deleting record', err) });
            }).catch('eroor error');
    }).timeout(2000);
});
*/