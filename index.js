'use strict'

let collections = require('./lib/array');

let A = new Promise();
let B = new Promise();
let C = new Promise();

collections.map({
    a: A,
    b: B,
    c: C
}).then(function(obj) {
    console.log("Just got back" + JSON.stringify(obj));
});

A.resolve('a1');
B.resolve('b1');
C.resolve('c1');
