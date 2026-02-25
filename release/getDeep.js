'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var scope = require('./scope.js');

function getDeep() {
    var result = '';
    for (var i = 0; i < scope["default"].deep.length; i++) {
        result += '│';
    }
    return result;
}

exports["default"] = getDeep;
