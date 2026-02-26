'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function getCurrentResult(scope) {
    let result = scope.result;
    for (let i = 0; i < scope.deep.length; i++) {
        const name = scope.deep[i];
        if (!(name in result)) {
            result[name] = {};
        }
        result = result[name];
    }
    return result;
}

exports.getCurrentResult = getCurrentResult;
