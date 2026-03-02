'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var chalk = require('chalk');
var scope = require('./scope.js');
require('./utils/index.js');
var assignScope = require('./utils/assignScope/assignScope.js');
var getPrefix = require('./utils/getPrefix/getPrefix.js');
var getCurrentResult = require('./utils/getCurrentResult/getCurrentResult.js');
var beautifyNumber = require('./utils/beautifyNumber/beautifyNumber.js');
var deltaLimitPlaceholder = require('./utils/deltaLimitPlaceholder/deltaLimitPlaceholder.js');
var getLimitColor = require('./utils/getLimitColor/getLimitColor.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var chalk__default = /*#__PURE__*/_interopDefaultLegacy(chalk);

function describe(name, callback, timeout = scope.scope) {
    const prevScope = Object.assign({}, scope.scope);
    const options = assignScope.assignScope(timeout);
    console.log(getPrefix.getPrefix() + '╒ ' + name);
    scope.scope.deep.push(name);
    let failed = false;
    if (options.throwError) {
        callback();
    }
    else {
        try {
            callback();
        }
        catch (e) {
            console.log(`${getPrefix.getPrefix()} ${chalk__default["default"].red(`⚠ ${e.message ?? e}`)}`);
            scope.scope.errors++;
            failed = true;
        }
    }
    const failedMessage = failed ? chalk__default["default"].red(' ⚠ Broken group') : '';
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
        const names = Object.keys(result).sort((a, b) => result[b].value - result[a].value);
        const errors = names.map(name => result[name].error);
        const limits = {
            minDelta: options.limits.minDelta,
            maxDelta: options.limits.maxDelta,
            currentDelta: options.limits.currentDelta,
            valueDelta: options.limits.valueDelta,
            deltaDelta: options.limits.deltaDelta,
        };
        const rows = names.map(name => {
            const { min, max, prevMin, prevMax, current, value, prev, error, success } = result[name];
            const progress = value / winner.value * 100;
            const count = Math.ceil(progress / 5);
            const average = (min + max) / 2;
            const prevAverage = (prevMin + prevMax) / 2;
            const delta = (min - max) / average * 100;
            const prevDelta = (prevMin - prevMax) / prevAverage * 100;
            const deltaDelta = prevDelta ? (delta - prevDelta) / prevDelta * 100 : 0;
            const data = {
                average,
                prevAverage,
                delta: `${beautifyNumber.beautifyNumber(Math.abs(delta), 1)}%`,
                prevDelta: `${beautifyNumber.beautifyNumber(Math.abs(prevDelta), 1)}%`,
                deltaDelta,
                deltaIcon: options.deltaIcon,
                prevDeltaIcon: options.deltaIcon,
                min,
                max,
                minDelta: (min - prevMin) / prevMin * 100,
                maxDelta: (max - prevMax) / prevMax * 100,
                current,
                currentDelta: (current - prev) / prev * 100,
                value,
                valueDelta: (value - prev) / prev * 100,
                progressStart: options.progressIcon.repeat(count),
                progressEnd: options.progressEndIcon.repeat(20 - count),
                statusIcon: error ? options.errorStatusIcon : success ? options.successStatusIcon : options.warningStatusIcon,
                progressDelta: `${beautifyNumber.beautifyNumber(progress, 1)}%`,
                prev,
                name,
                prevMin,
                prevMax,
            };
            return options.columns.map(mask => deltaLimitPlaceholder.deltaLimitPlaceholder(mask, data, limits, { deltaDelta: true }, (result, id) => {
                if (['delta', 'deltaIcon'].includes(id))
                    return getLimitColor.getLimitColor(delta, result, options.limits.delta, delta !== prevDelta);
                if (['prevDelta', 'prevDeltaIcon'].includes(id))
                    return getLimitColor.getLimitColor(prevDelta, result, options.limits.delta, true);
                if (id === 'min')
                    return data.minDelta ? result : chalk__default["default"].dim(result);
                if (id === 'max')
                    return data.maxDelta ? result : chalk__default["default"].dim(result);
                if (id === 'current')
                    return data.currentDelta ? result : chalk__default["default"].dim(result);
                if (id === 'value')
                    return data.valueDelta ? result : chalk__default["default"].dim(result);
                if (['statusIcon', 'progressStart'].includes(id))
                    return getLimitColor.getLimitColor(progress, result, options.limits.progress);
                if (['progressEnd'].includes(id))
                    return chalk__default["default"].dim(result);
                if (['deltaDelta'].includes(id))
                    return getLimitColor.getLimitColor(-delta * (deltaDelta / 100), result, options.limits.deltaDelta);
                return result;
            }));
        });
        const sizes = options.columns.map((_, index) => Math.max(...rows.map((columns) => columns[index][0].length)));
        const errorsSize = errors.filter(Boolean).length;
        const border = options.columns.map((_, index) => '─'.repeat(sizes[index]));
        const header = `${getPrefix.getPrefix()}│┌─${border.join('─┬─')}─┐`;
        const footer = `${getPrefix.getPrefix()}│└─${border.join('─┴─')}─┘`;
        console.log(header);
        rows.forEach((columns, index) => {
            const text = ` ${columns.map(([raw, text], index) => text + ' '.repeat(sizes[index] - raw.length)).join(' │ ')} `;
            console.log(`${getPrefix.getPrefix()}││${result[names[index]].highlight ? chalk__default["default"].bgBlack(text) : text}│`);
        });
        console.log(footer);
        console.log(`${getPrefix.getPrefix()}╘ ${chalk__default["default"].white(name + `:${failedMessage} `)}${errorsSize ? chalk__default["default"].red(`⚠ Broken ${errorsSize} test${errorsSize > 1 ? 's' : ''} `) : ''}${chalk__default["default"].cyan(winner.name)} [${chalk__default["default"].cyan(beautifyNumber.beautifyNumber(winner.value))}]`);
    }
    else {
        console.log(getPrefix.getPrefix() + '╘ ' + chalk__default["default"].white(name) + failedMessage);
    }
    Object.assign(scope.scope, prevScope);
}

exports.describe = describe;
