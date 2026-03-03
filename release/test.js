'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var chalk = require('chalk');
var scope = require('./scope.js');
require('./utils/index.js');
var assignScope = require('./utils/assignScope/assignScope.js');
var getCurrentResult = require('./utils/getCurrentResult/getCurrentResult.js');
var getPrefix = require('./utils/getPrefix/getPrefix.js');
var performance = require('./utils/performance/performance.js');
var getLimitColor = require('./utils/getLimitColor/getLimitColor.js');
var beautifyNumber = require('./utils/beautifyNumber/beautifyNumber.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var chalk__default = /*#__PURE__*/_interopDefaultLegacy(chalk);

function test(test, callback, timeout = scope.scope) {
    const { highlight, ...rest } = typeof timeout === 'number' ? { timeout } : timeout;
    const options = assignScope.assignScope(rest);
    if (!options.preventGC && typeof gc !== 'undefined') {
        gc();
    }
    let value = 0;
    const object = getCurrentResult.getCurrentResult(scope.scope);
    const deepPrefix = getPrefix.getPrefix().slice(0, -1) + '╞';
    const logging = options.logging || !scope.scope.deep.length;
    if (options.throwError) {
        value = performance.performance(callback, options.timeout);
    }
    else {
        try {
            value = performance.performance(callback, options.timeout);
        }
        catch (e) {
            console.log(`${deepPrefix} ${chalk__default["default"].red(`${test}: ⚠ ${e.message ?? e}`)}`);
            scope.scope.errors++;
            object[test] = {
                ...object[test],
                error: e,
            };
            return;
        }
    }
    function log(result, average, delta) {
        const deltaText = delta ? getLimitColor.getLimitColor(delta, ` (Δ ${beautifyNumber.beautifyNumber(delta, 2)}%)`, options.limits.delta) : '';
        console.log(`${deepPrefix} ${chalk__default["default"].yellow(test)}${average ? ` [${chalk__default["default"].yellow(beautifyNumber.beautifyNumber(average))}]` : ''}: ${result}${deltaText}`);
    }
    if (test in object) {
        object[test].success = Symbol('Success');
        object[test].prev = object[test].value;
        object[test].current = value;
        object[test].prevMin = object[test].min;
        object[test].prevMax = object[test].max;
        object[test].highlight = highlight;
        const { min, max } = object[test];
        const averageValue = object[test].value = (object[test].value + value) / 2;
        const currentMin = Math.min(min, value);
        const currentMax = Math.max(min, value);
        const delta = (currentMax - currentMin) / currentMax * 100;
        if (value < min) {
            object[test].min = value;
            if (logging) {
                const level = ((min - value) * 10 / min) | 0;
                let arrow = '<';
                for (let i = 0; i < level; i++) {
                    arrow += '<';
                }
                if (min === max) {
                    log(`${chalk__default["default"].red(`${beautifyNumber.beautifyNumber(value)} ${arrow}`)} ${chalk__default["default"].gray(`${beautifyNumber.beautifyNumber(min)}`)}`, averageValue, delta);
                }
                else {
                    log(`${chalk__default["default"].red(`${beautifyNumber.beautifyNumber(value)} ${arrow}`)} ${chalk__default["default"].gray(`${beautifyNumber.beautifyNumber(min)} < ${beautifyNumber.beautifyNumber(max)}`)}`, averageValue, delta);
                }
            }
        }
        else if (value > max) {
            object[test].max = value;
            if (logging) {
                const level = ((value - max) * 10 / value) | 0;
                let arrow = '<';
                for (let i = 0; i < level; i++) {
                    arrow += '<';
                }
                if (min === max) {
                    log(`${chalk__default["default"].gray(beautifyNumber.beautifyNumber(min))} ${chalk__default["default"].green(arrow + ` ${beautifyNumber.beautifyNumber(value)}`)}`, averageValue, delta);
                }
                else {
                    log(`${chalk__default["default"].gray(beautifyNumber.beautifyNumber(min) + ' < ' + beautifyNumber.beautifyNumber(max))} ${chalk__default["default"].green(arrow + ` ${beautifyNumber.beautifyNumber(value)}`)}`, averageValue, delta);
                }
            }
        }
        else if (logging) {
            if (min === max) {
                log(beautifyNumber.beautifyNumber(value));
            }
            else {
                log(`${chalk__default["default"].gray(beautifyNumber.beautifyNumber(min) + ' <')} ${beautifyNumber.beautifyNumber(value)} ${chalk__default["default"].gray('< ' + beautifyNumber.beautifyNumber(max))}`, averageValue, delta);
            }
        }
    }
    else {
        object[test] = {
            min: value,
            max: value,
            prevMin: value,
            prevMax: value,
            value,
            prev: value,
            current: value,
            success: Symbol('Success'),
            highlight,
        };
        if (logging) {
            log(beautifyNumber.beautifyNumber(value));
        }
    }
    if (!options.preventGC && typeof gc !== 'undefined') {
        gc();
    }
}

exports.test = test;
