import type { Result, Scope } from '../../type'

export function getCurrentResult (scope: Scope): Result {
  let result = scope.result

  for (let i = 0; i < scope.deep.length; i++) {
    const name = scope.deep[i]

    if (!(name in result)) {
      result[name] = {}
    }

    result = result[name]
  }

  return result
}
