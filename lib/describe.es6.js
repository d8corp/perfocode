import scope from './scope.es6.js';
import chalk from 'chalk';
import getDeep from './getDeep.es6.js';
import './performance.es6.js';
import { beautifyNumber } from './test.es6.js';

function describe(name, callback, timeout = scope.currentTimeout) {
    const beforeTimeout = scope.currentTimeout;
    scope.currentTimeout = timeout;
    console.log(getDeep() + '╒ ' + name);
    scope.deep.push(name);
    callback();
    let { result } = scope;
    for (let i = 0; i < scope.deep.length; i++) {
        result = result[scope.deep[i]];
    }
    scope.deep.pop();
    let winner = { value: 0, name: '' };
    for (const name in result) {
        const { value } = result[name];
        if (typeof value === 'number' && winner.value < value) {
            winner = { value, name };
        }
    }
    if (winner.value) {
        console.log(`${getDeep()}╘ ${chalk.white(name + ': ')}${chalk.cyan(winner.name)} [${chalk.cyan(beautifyNumber(winner.value))}]`);
    }
    else {
        console.log(getDeep() + '╘ ' + chalk.white(name));
    }
    scope.currentTimeout = beforeTimeout;
}

export default describe;
export { describe };
