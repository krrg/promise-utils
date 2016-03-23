'use strict'

const assert = require('assert');
const Arrays = require('../lib/arrays');
const _ = require('lodash');


describe("Arrays", function() {

    it(".all()", function(done) {
        let A = Promise.resolve('a');
        let B = Promise.resolve('b');
        let C = Promise.resolve('c');

        Arrays.all([A, B, C])
            .then(function(vals) {
                assert(_.isEqual(vals.sort(), ['a', 'b', 'c']));
                done();
            })
    });

    it(".allOrdered()", function(done) {
        let A = Promise.resolve('a');
        let B = Promise.resolve('b');
        let C = Promise.resolve('c');

        Arrays.all([A, B, C])
            .then(function(vals) {
                assert(_.isEqual(vals, ['a', 'b', 'c']));
                done();
            })
    });

    it(".afterAll()", function(done) {
        let A = Promise.resolve('a');
        let B = Promise.reject('b');
        let C = Promise.resolve('a');

        Arrays.afterAll([A, B, C])
            .then(function(promises) {
                assert(_.isEqual([A, B, C], promises));
                done();
            })
    });

    it(".both()", function(done) {
        let A = Promise.resolve('a');
        let B = Promise.resolve('b');

        Arrays.both(A, B)
            .then(function(vals) {
                assert(_.isEqual(['a', 'b'], vals.sort()));
                done();
            })
    });

    it(".any()", function(done) {
        let A = Promise.resolve('a');
        let B = Promise.reject('b');

        Arrays.any([A, B])
            .then(function(val) {
                assert(val === 'a');
                done();
            })
    });

});
