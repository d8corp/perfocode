import { __spreadArray, __read } from 'tslib';
import scope from './scope.es6.js';
import getDeep from './getDeep.es6.js';
import chalk from 'chalk';
import { beautifyNumber } from './test.es6.js';

function getProgressColor(progress, str) {
    if (progress > 15) {
        return chalk.green(str);
    }
    if (progress > 10) {
        return chalk.cyan(str);
    }
    if (progress > 5) {
        return chalk.yellow(str);
    }
    return chalk.red(str);
}
function describe(name, callback, timeout) {
    if (timeout === void 0) { timeout = scope.currentTimeout; }
    var beforeTimeout = scope.currentTimeout;
    scope.currentTimeout = timeout;
    console.log(getDeep() + '╒ ' + name);
    scope.deep.push(name);
    callback();
    var result = scope.result;
    for (var i = 0; i < scope.deep.length; i++) {
        result = result[scope.deep[i]];
    }
    scope.deep.pop();
    var winner = { value: 0, name: '' };
    for (var name_1 in result) {
        var value = result[name_1].value;
        if (typeof value === 'number' && winner.value < value) {
            winner = { value: value, name: name_1 };
        }
    }
    if (winner.value) {
        console.log("".concat(getDeep(), "\u2558 ").concat(chalk.white(name + ': ')).concat(chalk.cyan(winner.name), " [").concat(chalk.cyan(beautifyNumber(winner.value)), "]"));
        var names = Object.keys(result).sort(function (a, b) { return result[b].value - result[a].value; });
        var values_1 = names.map(function (name) { return String(beautifyNumber(result[name].value)); });
        var percentage_1 = names.map(function (name) { return "".concat(beautifyNumber(result[name].value / winner.value * 100, 2), "%"); });
        var progress_1 = names.map(function (name) {
            var progress = Math.round(result[name].value / winner.value * 20);
            return getProgressColor(progress, '▰'.repeat(progress)) + '▱'.repeat(20 - progress);
        });
        var nameSize_1 = Math.max.apply(Math, __spreadArray([], __read(names.map(function (name) { return name.length; })), false));
        var valuesSize_1 = Math.max.apply(Math, __spreadArray([], __read(values_1.map(function (value) { return value.length; })), false));
        var percentageSize_1 = Math.max.apply(Math, __spreadArray([], __read(percentage_1.map(function (percentage) { return percentage.length; })), false));
        console.log("".concat(getDeep(), "\u250C\u2500").concat('─'.repeat(nameSize_1), "\u2500\u252C\u2500").concat('─'.repeat(valuesSize_1), "\u2500\u252C\u2500").concat('─'.repeat(20), "\u2500\u252C\u2500").concat('─'.repeat(percentageSize_1), "\u2500\u2510"));
        names.forEach(function (testName, index) {
            console.log("".concat(getDeep(), "\u2502 ").concat(testName.padEnd(nameSize_1), " \u2502 ").concat(values_1[index].padEnd(valuesSize_1), " \u2502 ").concat(progress_1[index], " \u2502 ").concat(percentage_1[index].padEnd(percentageSize_1), " \u2502"));
        });
        console.log("".concat(getDeep(), "\u2514\u2500").concat('─'.repeat(nameSize_1), "\u2500\u2534\u2500").concat('─'.repeat(valuesSize_1), "\u2500\u2534\u2500").concat('─'.repeat(20), "\u2500\u2534\u2500").concat('─'.repeat(percentageSize_1), "\u2500\u2518"));
    }
    else {
        console.log(getDeep() + '╘ ' + chalk.white(name));
    }
    scope.currentTimeout = beforeTimeout;
}

export { describe as default, describe };
