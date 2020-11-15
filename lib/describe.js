'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var scope = require('./scope.js');
var chalk = require('chalk');
var getDeep = require('./getDeep.js');
var test = require('./test.js');
require('./performance.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var chalk__default = /*#__PURE__*/_interopDefaultLegacy(chalk);

function describe(name, callback, timeout) {
    if (timeout === void 0) { timeout = scope['default'].currentTimeout; }
    var beforeTimeout = scope['default'].currentTimeout;
    scope['default'].currentTimeout = timeout;
    console.log(getDeep() + '╒ ' + name);
    scope['default'].deep.push(name);
    callback();
    var result = scope['default'].result;
    for (var i = 0; i < scope['default'].deep.length; i++) {
        result = result[scope['default'].deep[i]];
    }
    scope['default'].deep.pop();
    var winner = { value: 0, name: '' };
    for (var name_1 in result) {
        var value = result[name_1].value;
        if (typeof value === 'number' && winner.value < value) {
            winner = { value: value, name: name_1 };
        }
    }
    if (winner.value) {
        console.log(getDeep() + "\u2558 " + chalk__default['default'].white(name + ': ') + chalk__default['default'].cyan(winner.name) + " [" + chalk__default['default'].cyan(test.beautifyNumber(winner.value)) + "]");
    }
    else {
        console.log(getDeep() + '╘ ' + chalk__default['default'].white(name));
    }
    scope['default'].currentTimeout = beforeTimeout;
}

exports.default = describe;
exports.describe = describe;
