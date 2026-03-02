import { scope } from '../../scope.es6.js';

function assignScope(options = scope) {
    const { limits = scope.limits, ...normalizeOptions } = typeof options === 'number' ? { timeout: options } : options;
    const { valueDelta = scope.limits.valueDelta, delta = scope.limits.delta, progress = scope.limits.progress, currentDelta = scope.limits.currentDelta, minDelta = scope.limits.minDelta, maxDelta = scope.limits.maxDelta, deltaDelta = scope.limits.deltaDelta, } = limits;
    const normalizedLimits = { valueDelta, delta, progress, currentDelta, minDelta, maxDelta, deltaDelta };
    Object.assign(scope, normalizeOptions, { limits: normalizedLimits });
    return { ...scope };
}

export { assignScope };
