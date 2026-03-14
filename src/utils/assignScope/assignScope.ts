import { scope } from '../../scope'
import type { Limits, Options } from '../../type'

export function assignScope (options: Options) {
  const { limits = scope.limits, ...normalizeOptions } = options

  const {
    valueDelta = scope.limits.valueDelta,
    delta = scope.limits.delta,
    progress = scope.limits.progress,
    currentDelta = scope.limits.currentDelta,
    minDelta = scope.limits.minDelta,
    maxDelta = scope.limits.maxDelta,
    deltaDelta = scope.limits.deltaDelta,
  } = limits

  const normalizedLimits: Limits = { valueDelta, delta, progress, currentDelta, minDelta, maxDelta, deltaDelta }

  Object.assign(scope, normalizeOptions, { limits: normalizedLimits })

  return { ...scope }
}
