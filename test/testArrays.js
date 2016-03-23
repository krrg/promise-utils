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
                console.log(promises);
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
        let B = Promise.reject('b');
        let A = Promise.resolve('a');

        Arrays.any([A, B])
            .then(function(val) {
                assert(val === 'a');
                done();
            })
    });

    it(".all() rejection", function(done) {
        let A = Promise.resolve('a');
        let B = Promise.reject('b');
        let C = Promise.resolve('c');

        Arrays.all([A, B, C])
            .catch(function(reason) {
                assert(reason === 'b');
                done();
            });
    });

    it(".allRace() rejection", function(done) {
        let A = Promise.resolve('a');
        let B = Promise.reject('b');
        let C = Promise.resolve('c');

        Arrays.allRace([A, B, C])
            .catch(function(reason) {
                assert(reason === 'b');
                done();
            })
    });

    it(".allOrdered() rejection", function(done) {
        let A = Promise.resolve('a');
        let B = Promise.resolve('b');
        let C = Promise.reject('c');

        Arrays.allOrdered([A, B, C])
            .catch(function(reason){
                assert(reason === 'c');
                done();
            })
    });

    it('any() rejection', function(done) {
        let A = Promise.reject('a');
        let B = Promise.reject('b');

        Arrays.any([A, B])
            .catch(function(val) {
                done();
            })

    });


});
