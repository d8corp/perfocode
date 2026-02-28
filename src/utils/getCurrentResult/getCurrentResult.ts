import type { Result, ResultTree, Scope } from '../../type'

export function getCurrentResult (scope: Scope) {
  let result: Result | ResultTree = scope.result

  for (let i = 0; i < scope.deep.length; i++) {
    const name = scope.deep[i]

    if (!(name in result)) {
      result[name] = {}
    }

    result = result[name]
  }

  return result
}
