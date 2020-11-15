'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var scope = require('./scope.js');
var chalk = require('chalk');
var getDeep = require('./getDeep.js');
var performance = require('./performance.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var chalk__default = /*#__PURE__*/_interopDefaultLegacy(chalk);

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function beautifyNumber(num, decimal) {
    if (decimal === void 0) { decimal = 4; }
    return parseFloat(num.toFixed(decimal));
}
function test(test, callback, timeout) {
    var e_1, _a;
    if (timeout === void 0) { timeout = scope['default'].currentTimeout; }
    var value = performance['default'](callback, timeout);
    var object = scope['default'].result;
    try {
        for (var _b = __values(scope['default'].deep), _c = _b.next(); !_c.done; _c = _b.next()) {
            var name_1 = _c.value;
            if (!(name_1 in object)) {
                object[name_1] = {};
            }
            object = object[name_1];
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_1) throw e_1.error; }
    }
    var deepPrefix = getDeep();
    if (deepPrefix) {
        deepPrefix = deepPrefix.slice(0, -1) + '╞';
    }
    function log(result, average) {
        console.log(deepPrefix + " " + chalk__default['default'].yellow(test) + (average ? " [" + chalk__default['default'].yellow(beautifyNumber(average)) + "]" : '') + ": " + result);
    }
    if (test in object) {
        var _d = object[test], min = _d.min, max = _d.max;
        var averageValue = object[test].value = (object[test].value + value) / 2;
        if (value < min) {
            var level = ((min - value) * 10 / min) | 0;
            var arrow = '<';
            for (var i = 0; i < level; i++) {
                arrow += '<';
            }
            if (min === max) {
                log(chalk__default['default'].red(beautifyNumber(value) + " " + arrow) + " " + chalk__default['default'].gray("" + beautifyNumber(min)), averageValue);
            }
            else {
                log(chalk__default['default'].red(beautifyNumber(value) + " " + arrow) + " " + chalk__default['default'].gray(beautifyNumber(min) + " < " + beautifyNumber(max)), averageValue);
            }
            object[test].min = value;
        }
        else if (value > max) {
            object[test].max = value;
            var level = ((value - max) * 10 / value) | 0;
            var arrow = '<';
            for (var i = 0; i < level; i++) {
                arrow += '<';
            }
            if (min === max) {
                log(chalk__default['default'].gray(beautifyNumber(min)) + " " + chalk__default['default'].green(arrow + (" " + beautifyNumber(value))), averageValue);
            }
            else {
                log(chalk__default['default'].gray(beautifyNumber(min) + ' < ' + beautifyNumber(max)) + " " + chalk__default['default'].green(arrow + (" " + beautifyNumber(value))), averageValue);
            }
        }
        else if (min === max) {
            log(beautifyNumber(value));
        }
        else {
            log(chalk__default['default'].gray(beautifyNumber(min) + ' <') + " " + beautifyNumber(value) + " " + chalk__default['default'].gray('< ' + beautifyNumber(max)), averageValue);
        }
    }
    else {
        object[test] = {
            min: value,
            max: value,
            value: value,
        };
        log(beautifyNumber(value));
    }
}

exports.beautifyNumber = beautifyNumber;
exports.default = test;
exports.test = test;
