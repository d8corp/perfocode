'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var scope = require('./scope.js');
var getDeep = require('./getDeep.js');
var performance = require('./performance.js');
var colors = require('colors');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var colors__default = /*#__PURE__*/_interopDefaultLegacy(colors);

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

function test(test, callback, timeout) {
    var e_1, _a;
    if (timeout === void 0) { timeout = scope['default'].currentTimeout; }
    var value = performance['default'](callback, timeout);
    var minColor = colors__default['default'].gray;
    var maxColor = colors__default['default'].gray;
    var beforeMin = '';
    var beforeMax = '';
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
    if (test in object) {
        if (value < object[test].min) {
            minColor = colors__default['default'].red;
            beforeMin = colors__default['default'].gray(object[test].min + ' < ');
            object[test].min = value;
        }
        else if (value > object[test].max) {
            maxColor = colors__default['default'].green;
            beforeMax = colors__default['default'].gray(' > ' + object[test].max);
            object[test].max = value;
        }
        console.log(deepPrefix + " " + test + ": " + minColor(object[test].min + " < ") + beforeMin + value + beforeMax + maxColor(" > " + object[test].max));
    }
    else {
        object[test] = {
            min: value,
            max: value,
        };
        console.log(deepPrefix + " " + test + ": " + value);
    }
}

exports.default = test;
exports.test = test;
