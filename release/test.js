'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var chalk = require('chalk');
var scope = require('./scope.js');
require('./utils/index.js');
var getCurrentResult = require('./utils/getCurrentResult/getCurrentResult.js');
var getPrefix = require('./utils/getPrefix/getPrefix.js');
var performance = require('./utils/performance/performance.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var chalk__default = /*#__PURE__*/_interopDefaultLegacy(chalk);

function beautifyNumber(num, decimal = 4) {
    return parseFloat(num.toFixed(decimal));
}
function test(test, callback, timeout = scope.scope) {
    const options = Object.assign({}, scope.scope, typeof timeout === 'number' ? { timeout } : timeout);
    let value = 0;
    const object = getCurrentResult.getCurrentResult(scope.scope);
    const deepPrefix = getPrefix.getPrefix().slice(0, -1) + '╞';
    if (options.throwError) {
        value = performance.performance(callback, options.timeout);
    }
    else {
        try {
            value = performance.performance(callback, options.timeout);
        }
        catch (e) {
            console.log(`${deepPrefix} ${chalk__default["default"].red(`${test}: Error (${e.message ?? e})`)}`);
            scope.scope.errors++;
            return;
        }
    }
    function log(result, average) {
        console.log(`${deepPrefix} ${chalk__default["default"].yellow(test)}${average ? ` [${chalk__default["default"].yellow(beautifyNumber(average))}]` : ''}: ${result}`);
    }
    if (test in object) {
        const { min, max } = object[test];
        const averageValue = object[test].value = (object[test].value + value) / 2;
        if (value < min) {
            const level = ((min - value) * 10 / min) | 0;
            let arrow = '<';
            for (let i = 0; i < level; i++) {
                arrow += '<';
            }
            if (min === max) {
                log(`${chalk__default["default"].red(`${beautifyNumber(value)} ${arrow}`)} ${chalk__default["default"].gray(`${beautifyNumber(min)}`)}`, averageValue);
            }
            else {
                log(`${chalk__default["default"].red(`${beautifyNumber(value)} ${arrow}`)} ${chalk__default["default"].gray(`${beautifyNumber(min)} < ${beautifyNumber(max)}`)}`, averageValue);
            }
            object[test].min = value;
        }
        else if (value > max) {
            object[test].max = value;
            const level = ((value - max) * 10 / value) | 0;
            let arrow = '<';
            for (let i = 0; i < level; i++) {
                arrow += '<';
            }
            if (min === max) {
                log(`${chalk__default["default"].gray(beautifyNumber(min))} ${chalk__default["default"].green(arrow + ` ${beautifyNumber(value)}`)}`, averageValue);
            }
            else {
                log(`${chalk__default["default"].gray(beautifyNumber(min) + ' < ' + beautifyNumber(max))} ${chalk__default["default"].green(arrow + ` ${beautifyNumber(value)}`)}`, averageValue);
            }
        }
        else if (min === max) {
            log(beautifyNumber(value));
        }
        else {
            log(`${chalk__default["default"].gray(beautifyNumber(min) + ' <')} ${beautifyNumber(value)} ${chalk__default["default"].gray('< ' + beautifyNumber(max))}`, averageValue);
        }
    }
    else {
        object[test] = {
            min: value,
            max: value,
            value,
        };
        log(beautifyNumber(value));
    }
    global.gc?.();
}

exports.beautifyNumber = beautifyNumber;
exports.test = test;
