'use strict'

module.exports = {

    all(promiseList) {
        return Promise.all(promiseList);
    },

    any(promiseList) {
        return new Promise(function(resolve, reject) {
            let resolved = false;
            promiseList.forEach(function(promise) {
                promise.then(function(val) {
                    if (resolved) {
                        return;
                    }
                    resolved = true;
                    resolve(val);
                });
            });
        });
    },

    keys(promiseMap) {
        const resultPromise = new Promise();

        let numKeysLeft = Object.keys(resultPromise).length;
        let resultMap = {};

        Object.keys(promiseMap).forEach(function(key) {
            promiseMap[key].then(function(val) {
                numKeys--;
                resultMap[key] = val;
                if (numKeys === 0) {
                    resultPromise.resolve(resultMap);
                }
            })
        });

        return resultPromise;
    }



}
