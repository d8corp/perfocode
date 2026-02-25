'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var scope = require('./scope.js');
var getDeep = require('./getDeep.js');
var chalk = require('chalk');
var test = require('./test.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var chalk__default = /*#__PURE__*/_interopDefaultLegacy(chalk);

function getProgressColor(progress, str) {
    if (progress > 15) {
        return chalk__default["default"].green(str);
    }
    if (progress > 10) {
        return chalk__default["default"].cyan(str);
    }
    if (progress > 5) {
        return chalk__default["default"].yellow(str);
    }
    return chalk__default["default"].red(str);
}
function describe(name, callback, timeout) {
    if (timeout === void 0) { timeout = scope["default"].currentTimeout; }
    var beforeTimeout = scope["default"].currentTimeout;
    scope["default"].currentTimeout = timeout;
    console.log(getDeep["default"]() + '╒ ' + name);
    scope["default"].deep.push(name);
    callback();
    var result = scope["default"].result;
    for (var i = 0; i < scope["default"].deep.length; i++) {
        result = result[scope["default"].deep[i]];
    }
    scope["default"].deep.pop();
    var winner = { value: 0, name: '' };
    for (var name_1 in result) {
        var value = result[name_1].value;
        if (typeof value === 'number' && winner.value < value) {
            winner = { value: value, name: name_1 };
        }
    }
    if (winner.value) {
        console.log("".concat(getDeep["default"](), "\u2558 ").concat(chalk__default["default"].white(name + ': ')).concat(chalk__default["default"].cyan(winner.name), " [").concat(chalk__default["default"].cyan(test.beautifyNumber(winner.value)), "]"));
        var names = Object.keys(result).sort(function (a, b) { return result[b].value - result[a].value; });
        var values_1 = names.map(function (name) { return String(test.beautifyNumber(result[name].value)); });
        var percentage_1 = names.map(function (name) { return "".concat(test.beautifyNumber(result[name].value / winner.value * 100, 2), "%"); });
        var progress_1 = names.map(function (name) {
            var progress = Math.round(result[name].value / winner.value * 20);
            return getProgressColor(progress, '▰'.repeat(progress)) + '▱'.repeat(20 - progress);
        });
        var nameSize_1 = Math.max.apply(Math, tslib.__spreadArray([], tslib.__read(names.map(function (name) { return name.length; })), false));
        var valuesSize_1 = Math.max.apply(Math, tslib.__spreadArray([], tslib.__read(values_1.map(function (value) { return value.length; })), false));
        var percentageSize_1 = Math.max.apply(Math, tslib.__spreadArray([], tslib.__read(percentage_1.map(function (percentage) { return percentage.length; })), false));
        console.log("".concat(getDeep["default"](), "\u250C\u2500").concat('─'.repeat(nameSize_1), "\u2500\u252C\u2500").concat('─'.repeat(valuesSize_1), "\u2500\u252C\u2500").concat('─'.repeat(20), "\u2500\u252C\u2500").concat('─'.repeat(percentageSize_1), "\u2500\u2510"));
        names.forEach(function (testName, index) {
            console.log("".concat(getDeep["default"](), "\u2502 ").concat(testName.padEnd(nameSize_1), " \u2502 ").concat(values_1[index].padEnd(valuesSize_1), " \u2502 ").concat(progress_1[index], " \u2502 ").concat(percentage_1[index].padEnd(percentageSize_1), " \u2502"));
        });
        console.log("".concat(getDeep["default"](), "\u2514\u2500").concat('─'.repeat(nameSize_1), "\u2500\u2534\u2500").concat('─'.repeat(valuesSize_1), "\u2500\u2534\u2500").concat('─'.repeat(20), "\u2500\u2534\u2500").concat('─'.repeat(percentageSize_1), "\u2500\u2518"));
    }
    else {
        console.log(getDeep["default"]() + '╘ ' + chalk__default["default"].white(name));
    }
    scope["default"].currentTimeout = beforeTimeout;
}

exports["default"] = describe;
exports.describe = describe;
