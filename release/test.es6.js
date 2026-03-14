import chalk from 'chalk';
import { scope } from './scope.es6.js';
import './utils/index.es6.js';
import { assignScope } from './utils/assignScope/assignScope.es6.js';
import { getCurrentResult } from './utils/getCurrentResult/getCurrentResult.es6.js';
import { getPrefix } from './utils/getPrefix/getPrefix.es6.js';
import { performance } from './utils/performance/performance.es6.js';
import { getLimitColor } from './utils/getLimitColor/getLimitColor.es6.js';
import { beautifyNumber } from './utils/beautifyNumber/beautifyNumber.es6.js';

function test(testName, callback, timeout = scope.timeout) {
    const { name = testName, call = callback, highlight, useAfter, useBefore, ...rest } = typeof timeout === 'number'
        ? { timeout }
        : callback
            ? timeout
            : testName;
    const options = assignScope(rest);
    if (!options.preventGC && typeof gc !== 'undefined') {
        gc();
    }
    let value = 0;
    const object = getCurrentResult(scope);
    const deepPrefix = getPrefix().slice(0, -1) + '╞';
    const logging = options.logging || !scope.deep.length;
    if (options.throwError) {
        value = performance(call, options.timeout, useBefore, useAfter);
    }
    else {
        try {
            value = performance(call, options.timeout, useBefore, useAfter);
        }
        catch (e) {
            console.log(`${deepPrefix} ${chalk.red(`${name}: ⚠ ${e.message ?? e}`)}`);
            scope.errors++;
            object[name] = {
                ...object[name],
                error: e,
            };
            return;
        }
    }
    function log(result, average, delta) {
        const deltaText = delta ? getLimitColor(delta, ` (Δ ${beautifyNumber(delta, 2)}%)`, options.limits.delta) : '';
        console.log(`${deepPrefix} ${chalk.yellow(name)}${average ? ` [${chalk.yellow(beautifyNumber(average))}]` : ''}: ${result}${deltaText}`);
    }
    if (name in object) {
        object[name].success = Symbol('Success');
        object[name].prev = object[name].value;
        object[name].current = value;
        object[name].prevMin = object[name].min;
        object[name].prevMax = object[name].max;
        object[name].highlight = highlight;
        const { min, max } = object[name];
        const averageValue = object[name].value = (object[name].value + value) / 2;
        const currentMin = Math.min(min, value);
        const currentMax = Math.max(min, value);
        const delta = (currentMax - currentMin) / currentMax * 100;
        if (value < min) {
            object[name].min = value;
            if (logging) {
                const level = ((min - value) * 10 / min) | 0;
                let arrow = '<';
                for (let i = 0; i < level; i++) {
                    arrow += '<';
                }
                if (min === max) {
                    log(`${chalk.red(`${beautifyNumber(value)} ${arrow}`)} ${chalk.gray(`${beautifyNumber(min)}`)}`, averageValue, delta);
                }
                else {
                    log(`${chalk.red(`${beautifyNumber(value)} ${arrow}`)} ${chalk.gray(`${beautifyNumber(min)} < ${beautifyNumber(max)}`)}`, averageValue, delta);
                }
            }
        }
        else if (value > max) {
            object[name].max = value;
            if (logging) {
                const level = ((value - max) * 10 / value) | 0;
                let arrow = '<';
                for (let i = 0; i < level; i++) {
                    arrow += '<';
                }
                if (min === max) {
                    log(`${chalk.gray(beautifyNumber(min))} ${chalk.green(arrow + ` ${beautifyNumber(value)}`)}`, averageValue, delta);
                }
                else {
                    log(`${chalk.gray(beautifyNumber(min) + ' < ' + beautifyNumber(max))} ${chalk.green(arrow + ` ${beautifyNumber(value)}`)}`, averageValue, delta);
                }
            }
        }
        else if (logging) {
            if (min === max) {
                log(beautifyNumber(value));
            }
            else {
                log(`${chalk.gray(beautifyNumber(min) + ' <')} ${beautifyNumber(value)} ${chalk.gray('< ' + beautifyNumber(max))}`, averageValue, delta);
            }
        }
    }
    else {
        object[name] = {
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
            log(beautifyNumber(value));
        }
    }
    if (!options.preventGC && typeof gc !== 'undefined') {
        gc();
    }
}

export { test };
