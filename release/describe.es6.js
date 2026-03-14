import chalk from 'chalk';
import { scope } from './scope.es6.js';
import './utils/index.es6.js';
import { assignScope } from './utils/assignScope/assignScope.es6.js';
import { getPrefix } from './utils/getPrefix/getPrefix.es6.js';
import { getCurrentResult } from './utils/getCurrentResult/getCurrentResult.es6.js';
import { beautifyNumber } from './utils/beautifyNumber/beautifyNumber.es6.js';
import { deltaLimitPlaceholder } from './utils/deltaLimitPlaceholder/deltaLimitPlaceholder.es6.js';
import { getLimitColor } from './utils/getLimitColor/getLimitColor.es6.js';

function describe(params, callback, timeout = scope.timeout) {
    const prevScope = Object.assign({}, scope);
    const { name = params, call = callback, ...rest } = typeof timeout === 'number'
        ? { timeout }
        : callback
            ? timeout
            : params;
    const options = assignScope(rest);
    console.log(getPrefix() + '╒ ' + name);
    scope.deep.push(name);
    let failed = false;
    if (options.throwError) {
        call();
    }
    else {
        try {
            call();
        }
        catch (e) {
            console.log(`${getPrefix()} ${chalk.red(`⚠ ${e.message ?? e}`)}`);
            scope.errors++;
            failed = true;
        }
    }
    const failedMessage = failed ? chalk.red(' ⚠ Broken group') : '';
    const result = getCurrentResult(scope);
    scope.deep.pop();
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
                delta: `${beautifyNumber(Math.abs(delta), 1)}%`,
                prevDelta: `${beautifyNumber(Math.abs(prevDelta), 1)}%`,
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
                progressDelta: `${beautifyNumber(progress, 1)}%`,
                prev,
                name,
                prevMin,
                prevMax,
            };
            return options.columns.map(mask => deltaLimitPlaceholder(mask, data, limits, { deltaDelta: true }, (result, id) => {
                if (['delta', 'deltaIcon'].includes(id))
                    return getLimitColor(delta, result, options.limits.delta, delta !== prevDelta);
                if (['prevDelta', 'prevDeltaIcon'].includes(id))
                    return getLimitColor(prevDelta, result, options.limits.delta, true);
                if (id === 'min')
                    return data.minDelta ? result : chalk.dim(result);
                if (id === 'max')
                    return data.maxDelta ? result : chalk.dim(result);
                if (id === 'current')
                    return data.currentDelta ? result : chalk.dim(result);
                if (id === 'value')
                    return data.valueDelta ? result : chalk.dim(result);
                if (['statusIcon', 'progressStart'].includes(id))
                    return getLimitColor(progress, result, options.limits.progress);
                if (['progressEnd'].includes(id))
                    return chalk.dim(result);
                if (['deltaDelta'].includes(id))
                    return getLimitColor(-delta * (deltaDelta / 100), result, options.limits.deltaDelta);
                return result;
            }));
        });
        const sizes = options.columns.map((_, index) => Math.max(...rows.map((columns) => columns[index][0].length)));
        const errorsSize = errors.filter(Boolean).length;
        const border = options.columns.map((_, index) => '─'.repeat(sizes[index]));
        const header = `${getPrefix()}│┌─${border.join('─┬─')}─┐`;
        const footer = `${getPrefix()}│└─${border.join('─┴─')}─┘`;
        console.log(header);
        rows.forEach((columns, index) => {
            const text = ` ${columns.map(([raw, text], index) => text + ' '.repeat(sizes[index] - raw.length)).join(' │ ')} `;
            console.log(`${getPrefix()}││${result[names[index]].highlight ? chalk.bgBlack(text) : text}│`);
        });
        console.log(footer);
        console.log(`${getPrefix()}╘ ${chalk.white(name + `:${failedMessage} `)}${errorsSize ? chalk.red(`⚠ Broken ${errorsSize} test${errorsSize > 1 ? 's' : ''} `) : ''}${chalk.cyan(winner.name)} [${chalk.cyan(beautifyNumber(winner.value))}]`);
    }
    else {
        console.log(getPrefix() + '╘ ' + chalk.white(name) + failedMessage);
    }
    Object.assign(scope, prevScope);
}

export { describe };
