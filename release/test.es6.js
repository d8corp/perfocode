import chalk from 'chalk';
import { scope } from './scope.es6.js';
import './utils/index.es6.js';
import { getCurrentResult } from './utils/getCurrentResult/getCurrentResult.es6.js';
import { getPrefix } from './utils/getPrefix/getPrefix.es6.js';
import { performance } from './utils/performance/performance.es6.js';
import { getDeltaColor } from './utils/getDeltaColor/getDeltaColor.es6.js';

function beautifyNumber(num, decimal = 4) {
    return parseFloat(num.toFixed(decimal));
}
function test(test, callback, timeout = scope) {
    const options = Object.assign({}, scope, typeof timeout === 'number' ? { timeout } : timeout);
    let value = 0;
    const object = getCurrentResult(scope);
    const deepPrefix = getPrefix().slice(0, -1) + '╞';
    if (options.throwError) {
        value = performance(callback, options.timeout);
    }
    else {
        try {
            value = performance(callback, options.timeout);
        }
        catch (e) {
            console.log(`${deepPrefix} ${chalk.red(`${test}: Error (${e.message ?? e})`)}`);
            scope.errors++;
            return;
        }
    }
    function log(result, average, delta) {
        console.log(`${deepPrefix} ${chalk.yellow(test)}${average ? ` [${chalk.yellow(beautifyNumber(average))}]` : ''}: ${result}${delta ? getDeltaColor(delta, ` (Δ ${beautifyNumber(delta, 2)}%)`) : ''}`);
    }
    if (test in object) {
        const { min, max } = object[test];
        const averageValue = object[test].value = (object[test].value + value) / 2;
        const currentMin = Math.min(min, value);
        const currentMax = Math.max(min, value);
        const delta = (currentMax - currentMin) / currentMax * 100;
        if (value < min) {
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
                log(`${chalk.gray(beautifyNumber(min))} ${chalk.green(arrow + ` ${beautifyNumber(value)}`)}`, averageValue, delta);
            }
            else {
                log(`${chalk.gray(beautifyNumber(min) + ' < ' + beautifyNumber(max))} ${chalk.green(arrow + ` ${beautifyNumber(value)}`)}`, averageValue, delta);
            }
        }
        else if (min === max) {
            log(beautifyNumber(value));
        }
        else {
            log(`${chalk.gray(beautifyNumber(min) + ' <')} ${beautifyNumber(value)} ${chalk.gray('< ' + beautifyNumber(max))}`, averageValue, delta);
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

export { beautifyNumber, test };
