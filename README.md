# Promise Utils

> Warning: Not intended for production use; this is purely a for fun project.  See LICENSE.

The native ES6 `Promise` implementation is helpful, but does not contain the typical assortment of utility functions available in most promise libraries.  However, the default `Promise` does contain a `.all()` and `.race()` function.

We implement several more useful utility functions, as described below.

## `Arrays`

### `.all(promises)`
Returns a single promise that is resolved when all of the given promises are resolved. The resolved value will be an array of values in an arbitrary order returned  If any of the promises rejects, then returned promise will also reject with the reason given by the first promise to reject.

### `.allRace(promises)`
Returns a single promise that is resolved when all of the given promises are resolved. The resolved value will be an array of values in the order that their corresponding promises resolved in (not necessarily the order the promises were passed in). If any of the promises rejects, then returned promise will also reject with the reason given by the first promise to reject.

### `.allOrdered(promises)`
Returns a single promise that is resolved when all of the given promises are resolved. The resolved value will be an array of values in the order that their corresponding promises were passed into the function in (not necessarily the order the promises were resolved in). If any of the promises rejects, then returned promise will also reject with the reason given by the first promise to reject.

### `.afterAll(promises)`
Returns a single promise that is resolved when all of the given promises are either resolved or rejected. The resolved value will be an array of `Promise` objects, which may have either been rejected or resolved. The promise returned from this function will never itself be rejected.

### `.both(promise, promise)`
Returns a single promise that is resolved when both of the given promises are resolved. The resolved value will be an array of values from the returned promises in the same order their corresponding promises were passed in. If either promise rejects, then the returned promise will also reject.

### `.any(promises)`
Returns a single promise that is resolved when any of the given promises are resolved. Will only reject if _all_ of the given promises reject. The resolved value will be the value from the first resolved promise.

## Objects
All of these functions expect an object in the form `{key: promise, key: promise, ...}`
### `.keys(object)`
Returns a single promise that is resolved when all of the promises (as values in the object/map) are resolved. The resolved value is an object that maps the given keys to their resolved values. If any of the promises rejects, then the returned promise will also reject with the first reason given.

### `.afterKeys(object)`
Returns a single promise that is resolved when all of the promises (as values in the object/map) are resolved or rejected. The mapped value is the promise itself.

## Utility
### `.not(promise)`
Returns a single promise that is resolved when the given promise is rejected, and is rejected if the given promise is resolved successfully. The intent is that this function is useful in unit testing, or other situations in which the actual resolution of a promise might signal an error state. The resolved value is the `reason` and the rejected reason is the `value`.
