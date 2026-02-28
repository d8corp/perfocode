export type Callback = () => void

export interface MinMaxDeltaLimits {
  warning: number
  error: number
}

export interface ProgressLimits {
  warning: number
  error: number
  good: number
}

export interface DeltaLimits {
  poor: number
  bad: number
  critical: number
  good: number
  great: number
  awesome: number
}

export interface Limits {
  delta: MinMaxDeltaLimits
  progress: ProgressLimits
  valueDelta: DeltaLimits
  currentDelta: DeltaLimits
  minDelta: DeltaLimits
  maxDelta: DeltaLimits
}

export interface Result {
  value?: number
  prev?: number
  min?: number
  max?: number
  prevMin?: number
  prevMax?: number
  current?: number
  error?: Error
  success?: symbol
  highlight?: boolean
}

export type ResultTree = {
  [key: string]: ResultTree | Result;
}

export interface Winner {
  name: string
  value: number
}

export interface Scope {
  deep: string[]
  result: ResultTree
  errors: 0
  throwError: boolean
  timeout: number
  noAsk: boolean
  logging: boolean
  preventGC: boolean
  limits: Partial<Limits>
  columns: string[]
}

export type Options = Partial<Scope>
export type TimeoutOption = Options | number
