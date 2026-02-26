import { scope } from '../../scope.es6.js';

function getPrefix() {
    let result = '';
    for (let i = 0; i < scope.deep.length; i++) {
        result += '│';
    }
    return result;
}

export { getPrefix };
