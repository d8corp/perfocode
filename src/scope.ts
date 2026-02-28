import type { Limits, Scope } from './type'

export const defaultLimits: Limits = {
  delta: {
    warning: 15,
    error: 30,
  },
  progress: {
    error: 25,
    warning: 50,
    good: 75,
  },
  valueDelta: {
    good: 5,
    great: 10,
    awesome: 15,
    poor: -5,
    bad: -10,
    critical: -15,
  },
  currentDelta: {
    good: 5,
    great: 10,
    awesome: 15,
    poor: -5,
    bad: -10,
    critical: -15,
  },
  minDelta: {
    good: 5,
    great: 10,
    awesome: 15,
    poor: -5,
    bad: -10,
    critical: -15,
  },
  maxDelta: {
    good: 5,
    great: 10,
    awesome: 15,
    poor: -5,
    bad: -10,
    critical: -15,
  },
}

export const scope: Scope = {
  deep: [],
  result: {},
  errors: 0,
  timeout: process.env.PERFOCODE_TIMEOUT ? Number(process.env.PERFOCODE_TIMEOUT) : 300,
  throwError: process.env.PERFOCODE_THROW_ERROR ? process.env.PERFOCODE_THROW_ERROR === 'true' : false,
  preventGC: process.env.PERFOCODE_PREVENT_GC ? process.env.PERFOCODE_PREVENT_GC === 'true' : false,
  noAsk: process.env.PERFOCODE_NO_ASK ? process.env.PERFOCODE_NO_ASK === 'true' : false,
  logging: process.env.PERFOCODE_LOGGING ? process.env.PERFOCODE_LOGGING === 'true' : false,
  limits: process.env.PERFOCODE_LIMITS ? JSON.parse(process.env.PERFOCODE_LIMITS) : defaultLimits,
  columns: process.env.PERFOCODE_COLUMNS
    ? process.env.PERFOCODE_COLUMNS.split('|').map(type => type.trim())
    : ['{statusIcon} {name}', '{current}{currentDelta}', 'Σ {value}{valueDelta}', '{progressStart}{progressEnd}', '{progressDelta}', '↺ {prev}', '{min} - {max}{minDelta}{maxDelta}', '{deltaIcon} {delta}'],
}
