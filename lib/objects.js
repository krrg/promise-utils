'use strict'

const _ = require('lodash');

const ObjectsPromises = {

    keys(obj) {
        return new Promise(function(resolve, reject) {

            results = {};
            _.keys(obj).forEach(function(key){
                obj[key].then(function(val) {
                    results[key] = val;

                    // TODO: There has to be a better way than this.
                    if (_.keys(results).length === _.keys(obj).length) {
                        resolve(results);
                    }
                }).catch(function(reason) {
                    reject(reason);
                });
            });

        });
    },

    afterKeys(obj) {
        return new Promise(function(resolve, reject) {

            results = {};
            _.keys(obj).forEach(function(key){
                obj[key].then(function(val) {
                    results[key] = {
                        'state': 'resolved',
                        'reason': val
                    }
                    // TODO: There has to be a better way than this.
                    if (_.keys(results).length === _.keys(obj).length) {
                        resolve(results);
                    }
                }).catch(function(reason) {
                    results[key] = {
                        'state': 'rejected',
                        'reason': reason
                    }
                    if (_.keys(results).length === _.keys(obj).length) {
                        resolve(results);
                    }
                });
            });

        });
    },

}

module.exports = ObjectsPromises;
