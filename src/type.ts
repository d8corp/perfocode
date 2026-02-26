export type Callback = () => void

export interface Result {
  value?: number | Error
  min?: number
  max?: number
}

export interface Winner {
  name: string
  value: number
}

export interface Scope {
  deep: string[]
  result: Result
  errors: 0
  throwError: boolean
  timeout: number
  noAsk: boolean
}

export type Options = Partial<Scope>
export type TimeoutOption = Options | number
