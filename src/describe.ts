import scope from './scope'
import getDeep from './getDeep'

function describe (name: string, callback: () => any, timeout = scope.currentTimeout) {
  const beforeTimeout = scope.currentTimeout
  scope.currentTimeout = timeout
  console.log(getDeep() + '╒ ' + name)
  scope.deep.push(name)
  callback()
  scope.deep.pop()
  console.log(getDeep() + '╘ ' + name)
  scope.currentTimeout = beforeTimeout
}

export default describe

export {
  describe
}
