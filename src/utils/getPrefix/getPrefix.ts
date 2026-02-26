import { scope } from '../../scope'

export function getPrefix (): string {
  let result = ''

  for (let i = 0; i < scope.deep.length; i++) {
    result += '│'
  }

  return result
}
