'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var scope = require('../../scope.js');

function getPrefix() {
    let result = '';
    for (let i = 0; i < scope.scope.deep.length; i++) {
        result += '│';
    }
    return result;
}

exports.getPrefix = getPrefix;
