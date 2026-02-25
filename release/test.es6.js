import { __values } from 'tslib';
import scope from './scope.es6.js';
import performance from './performance.es6.js';
import getDeep from './getDeep.es6.js';
import chalk from 'chalk';

function beautifyNumber(num, decimal) {
    if (decimal === void 0) { decimal = 4; }
    return parseFloat(num.toFixed(decimal));
}
function test(test, callback, timeout) {
    var e_1, _a;
    if (timeout === void 0) { timeout = scope.currentTimeout; }
    var value = performance(callback, timeout);
    var object = scope.result;
    try {
        for (var _b = __values(scope.deep), _c = _b.next(); !_c.done; _c = _b.next()) {
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
        console.log("".concat(deepPrefix, " ").concat(chalk.yellow(test)).concat(average ? " [".concat(chalk.yellow(beautifyNumber(average)), "]") : '', ": ").concat(result));
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
                log("".concat(chalk.red("".concat(beautifyNumber(value), " ").concat(arrow)), " ").concat(chalk.gray("".concat(beautifyNumber(min)))), averageValue);
            }
            else {
                log("".concat(chalk.red("".concat(beautifyNumber(value), " ").concat(arrow)), " ").concat(chalk.gray("".concat(beautifyNumber(min), " < ").concat(beautifyNumber(max)))), averageValue);
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
                log("".concat(chalk.gray(beautifyNumber(min)), " ").concat(chalk.green(arrow + " ".concat(beautifyNumber(value)))), averageValue);
            }
            else {
                log("".concat(chalk.gray(beautifyNumber(min) + ' < ' + beautifyNumber(max)), " ").concat(chalk.green(arrow + " ".concat(beautifyNumber(value)))), averageValue);
            }
        }
        else if (min === max) {
            log(beautifyNumber(value));
        }
        else {
            log("".concat(chalk.gray(beautifyNumber(min) + ' <'), " ").concat(beautifyNumber(value), " ").concat(chalk.gray('< ' + beautifyNumber(max))), averageValue);
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

export { beautifyNumber, test as default, test };
