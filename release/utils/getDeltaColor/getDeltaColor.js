'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var chalk = require('chalk');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var chalk__default = /*#__PURE__*/_interopDefaultLegacy(chalk);

function getDeltaColor(delta, str) {
    if (delta < 5) {
        return chalk__default["default"].green(str);
    }
    if (delta < 10) {
        return chalk__default["default"].cyan(str);
    }
    if (delta < 20) {
        return chalk__default["default"].yellow(str);
    }
    return chalk__default["default"].red(str);
}

exports.getDeltaColor = getDeltaColor;
