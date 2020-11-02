import scope from './scope.es6.js';

function getDeep() {
    let result = '';
    for (let i = 0; i < scope.deep.length; i++) {
        result += '│';
    }
    return result;
}

export default getDeep;
