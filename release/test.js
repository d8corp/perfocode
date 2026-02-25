'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var scope = require('./scope.js');
var performance = require('./performance.js');
var getDeep = require('./getDeep.js');
var chalk = require('chalk');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var chalk__default = /*#__PURE__*/_interopDefaultLegacy(chalk);

function beautifyNumber(num, decimal) {
    if (decimal === void 0) { decimal = 4; }
    return parseFloat(num.toFixed(decimal));
}
function test(test, callback, timeout) {
    var e_1, _a;
    if (timeout === void 0) { timeout = scope["default"].currentTimeout; }
    var value = performance["default"](callback, timeout);
    var object = scope["default"].result;
    try {
        for (var _b = tslib.__values(scope["default"].deep), _c = _b.next(); !_c.done; _c = _b.next()) {
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
    var deepPrefix = getDeep["default"]();
    if (deepPrefix) {
        deepPrefix = deepPrefix.slice(0, -1) + '╞';
    }
    function log(result, average) {
        console.log("".concat(deepPrefix, " ").concat(chalk__default["default"].yellow(test)).concat(average ? " [".concat(chalk__default["default"].yellow(beautifyNumber(average)), "]") : '', ": ").concat(result));
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
                log("".concat(chalk__default["default"].red("".concat(beautifyNumber(value), " ").concat(arrow)), " ").concat(chalk__default["default"].gray("".concat(beautifyNumber(min)))), averageValue);
            }
            else {
                log("".concat(chalk__default["default"].red("".concat(beautifyNumber(value), " ").concat(arrow)), " ").concat(chalk__default["default"].gray("".concat(beautifyNumber(min), " < ").concat(beautifyNumber(max)))), averageValue);
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
                log("".concat(chalk__default["default"].gray(beautifyNumber(min)), " ").concat(chalk__default["default"].green(arrow + " ".concat(beautifyNumber(value)))), averageValue);
            }
            else {
                log("".concat(chalk__default["default"].gray(beautifyNumber(min) + ' < ' + beautifyNumber(max)), " ").concat(chalk__default["default"].green(arrow + " ".concat(beautifyNumber(value)))), averageValue);
            }
        }
        else if (min === max) {
            log(beautifyNumber(value));
        }
        else {
            log("".concat(chalk__default["default"].gray(beautifyNumber(min) + ' <'), " ").concat(beautifyNumber(value), " ").concat(chalk__default["default"].gray('< ' + beautifyNumber(max))), averageValue);
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
exports["default"] = test;
exports.test = test;
