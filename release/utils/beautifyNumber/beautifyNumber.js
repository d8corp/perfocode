'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function beautifyNumber(num, decimal = 4) {
    return parseFloat(num.toFixed(decimal));
}

exports.beautifyNumber = beautifyNumber;
