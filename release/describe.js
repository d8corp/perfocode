'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var chalk = require('chalk');
var scope = require('./scope.js');
var test = require('./test.js');
require('./utils/index.js');
var getPrefix = require('./utils/getPrefix/getPrefix.js');
var getCurrentResult = require('./utils/getCurrentResult/getCurrentResult.js');
var getProgressColor = require('./utils/getProgressColor/getProgressColor.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var chalk__default = /*#__PURE__*/_interopDefaultLegacy(chalk);

function describe(name, callback, timeout = scope.scope) {
    const prevScope = Object.assign({}, scope.scope);
    Object.assign(scope.scope, typeof timeout === 'number' ? { timeout } : timeout);
    console.log(getPrefix.getPrefix() + '╒ ' + name);
    scope.scope.deep.push(name);
    callback();
    const result = getCurrentResult.getCurrentResult(scope.scope);
    scope.scope.deep.pop();
    let winner = { value: 0, name: '' };
    for (const name in result) {
        const { value } = result[name];
        if (typeof value === 'number' && winner.value < value) {
            winner = { value, name };
        }
    }
    if (winner.value) {
        console.log(`${getPrefix.getPrefix()}╘ ${chalk__default["default"].white(name + ': ')}${chalk__default["default"].cyan(winner.name)} [${chalk__default["default"].cyan(test.beautifyNumber(winner.value))}]`);
        const names = Object.keys(result).sort((a, b) => result[b].value - result[a].value);
        const values = names.map(name => String(test.beautifyNumber(result[name].value)));
        const percentage = names.map(name => `${test.beautifyNumber(result[name].value / winner.value * 100, 2)}%`);
        const progress = names.map(name => {
            const progress = Math.round(result[name].value / winner.value * 20);
            return getProgressColor.getProgressColor(progress, '▰'.repeat(progress)) + '▱'.repeat(20 - progress);
        });
        const nameSize = Math.max(...names.map(name => name.length));
        const valuesSize = Math.max(...values.map(value => value.length));
        const percentageSize = Math.max(...percentage.map(percentage => percentage.length));
        console.log(`${getPrefix.getPrefix()}┌─${'─'.repeat(nameSize)}─┬─${'─'.repeat(valuesSize)}─┬─${'─'.repeat(20)}─┬─${'─'.repeat(percentageSize)}─┐`);
        names.forEach((testName, index) => {
            console.log(`${getPrefix.getPrefix()}│ ${testName.padEnd(nameSize)} │ ${values[index].padEnd(valuesSize)} │ ${progress[index]} │ ${percentage[index].padEnd(percentageSize)} │`);
        });
        console.log(`${getPrefix.getPrefix()}└─${'─'.repeat(nameSize)}─┴─${'─'.repeat(valuesSize)}─┴─${'─'.repeat(20)}─┴─${'─'.repeat(percentageSize)}─┘`);
    }
    else {
        console.log(getPrefix.getPrefix() + '╘ ' + chalk__default["default"].white(name));
    }
    Object.assign(scope.scope, prevScope);
}

exports.describe = describe;
