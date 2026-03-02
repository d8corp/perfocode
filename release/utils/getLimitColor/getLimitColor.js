'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var chalk = require('chalk');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var chalk__default = /*#__PURE__*/_interopDefaultLegacy(chalk);

function getLimitColor(value, result, limits, changed = false) {
    if (!value)
        return changed ? result : chalk__default["default"].dim(result);
    if (limits.invert ? value < limits.awesome : value > limits.awesome) {
        return chalk__default["default"].cyan(result);
    }
    if (limits.invert ? value < limits.great : value > limits.great) {
        return chalk__default["default"].green(result);
    }
    if (limits.invert ? value < limits.good : value > limits.good) {
        return chalk__default["default"].greenBright.dim(result);
    }
    if (limits.invert ? value > limits.critical : value < limits.critical) {
        return chalk__default["default"].red(result);
    }
    if (limits.invert ? value > limits.bad : value < limits.bad) {
        return chalk__default["default"].yellow(result);
    }
    if (limits.invert ? value > limits.poor : value < limits.poor) {
        return chalk__default["default"].yellowBright.dim(result);
    }
    if (value > limits.normal) {
        return result;
    }
    return changed ? result : chalk__default["default"].dim(result);
}

exports.getLimitColor = getLimitColor;
