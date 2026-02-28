import { scope } from '../../scope'
import type { Limits, TimeoutOption } from '../../type'

export function assignScope (options: TimeoutOption = scope) {
  const { limits = scope.limits, ...normalizeOptions } = typeof options === 'number' ? { timeout: options } : options

  const {
    valueDelta = scope.limits.valueDelta,
    delta = scope.limits.delta,
    progress = scope.limits.progress,
    currentDelta = scope.limits.currentDelta,
    minDelta = scope.limits.minDelta,
    maxDelta = scope.limits.maxDelta,
  } = limits

  const normalizedLimits: Limits = { valueDelta, delta, progress, currentDelta, minDelta, maxDelta }

  Object.assign(scope, normalizeOptions, { limits: normalizedLimits })

  return { ...scope }
}
