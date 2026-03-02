'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var scope = require('../../scope.js');

function assignScope(options = scope.scope) {
    const { limits = scope.scope.limits, ...normalizeOptions } = typeof options === 'number' ? { timeout: options } : options;
    const { valueDelta = scope.scope.limits.valueDelta, delta = scope.scope.limits.delta, progress = scope.scope.limits.progress, currentDelta = scope.scope.limits.currentDelta, minDelta = scope.scope.limits.minDelta, maxDelta = scope.scope.limits.maxDelta, deltaDelta = scope.scope.limits.deltaDelta, } = limits;
    const normalizedLimits = { valueDelta, delta, progress, currentDelta, minDelta, maxDelta, deltaDelta };
    Object.assign(scope.scope, normalizeOptions, { limits: normalizedLimits });
    return { ...scope.scope };
}

exports.assignScope = assignScope;
