import scope from './scope.es6.js';

function getDeep() {
    var result = '';
    for (var i = 0; i < scope.deep.length; i++) {
        result += '│';
    }
    return result;
}

export { getDeep as default };
