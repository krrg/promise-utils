'use strict'

const ArrayPromise = {

    all(promiseList) {
        return Promise.all(promiseList);
    },

    allRace(promises) {
        return new Promise(function(resolve, reject) {
            let results = [];
            ArrayPromise.all(
                promises.map(function(promise) {
                    return promise.then(function(val) {
                        results.push(val);
                    })
                })
            )
            .then(function() {
                resolve(results);
            })
            .catch(function(reason) {
                reject(reason);
            })
        });
    },

    allOrdered(promises) {
        return new Promise(function(resolve, reject) {
            let results = new Array(promises.length);

            ArrayPromise.all(
                promises.map(function(promise, i) {
                    return promise.then(function(val) {
                        results[i] = val;
                    })
                })
            )
            .then(function() {
                resolve(results);
            })
            .catch(function(reason) {
                reject(reason);
            })
        });
    },

    afterAll(promises) {
        return new Promise(function(resolve, reject) {
            ArrayPromise.all(
                promises.map(function(promise) {
                    return promise.then(function(val) {
                        return {
                            'state': 'resolved',
                            'value': val
                        }
                    }).catch(function(reason){
                        return {
                            'state': 'rejected',
                            'reason': reason
                        }
                    })
                })
            ).then(function(vals) {
                resolve(vals);
            })
        })
    },

    both(promiseA, promiseB) {
        return ArrayPromise.allOrdered([promiseA, promiseB]);
    },

    any(promises) {
        let erroredReasons = [];
        return new Promise(function(resolve, reject) {

            promises.forEach(function(promise) {
                promise.then(function(val) {
                    resolve(val);
                }).catch(function(reason) {
                    erroredReasons.push(reason);
                    if (erroredReasons.length === promises.length) {
                        reject(erroredReasons);
                    }
                })
            })

        });
    }
}

module.exports = ArrayPromise;
