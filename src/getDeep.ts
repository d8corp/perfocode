import {scope} from './scope'

export default function getDeep (): string {
  let result = ''
  for (let i = 0; i < scope.deep.length; i++) {
    result += '│'
  }
  return result
}
