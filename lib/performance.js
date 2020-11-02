'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var scope = require('./scope.js');

function performance(callback, ms) {
    if (ms === void 0) { ms = scope['default'].currentTimeout; }
    var count = 0;
    var endTime = Date.now() + ms;
    do {
        callback();
        count++;
    } while (Date.now() < endTime);
    return count / ms;
}

exports.default = performance;
exports.performance = performance;
