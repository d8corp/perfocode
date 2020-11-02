'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var scope = require('./scope.js');
var getDeep = require('./getDeep.js');

function describe(name, callback, timeout) {
    if (timeout === void 0) { timeout = scope['default'].currentTimeout; }
    var beforeTimeout = scope['default'].currentTimeout;
    scope['default'].currentTimeout = timeout;
    console.log(getDeep() + '╒ ' + name);
    scope['default'].deep.push(name);
    callback();
    scope['default'].deep.pop();
    console.log(getDeep() + '╘ ' + name);
    scope['default'].currentTimeout = beforeTimeout;
}

exports.default = describe;
exports.describe = describe;
