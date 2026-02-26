'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var chalk = require('chalk');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var chalk__default = /*#__PURE__*/_interopDefaultLegacy(chalk);

function getProgressColor(progress, str) {
    if (progress > 15) {
        return chalk__default["default"].green(str);
    }
    if (progress > 10) {
        return chalk__default["default"].cyan(str);
    }
    if (progress > 5) {
        return chalk__default["default"].yellow(str);
    }
    return chalk__default["default"].red(str);
}

exports.getProgressColor = getProgressColor;
