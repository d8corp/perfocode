import scope from './scope'

function performance (callback: () => void, ms = scope.currentTimeout): number {
  let count = 0
  const endTime = Date.now() + ms
  do {
    callback()
    count++
  } while (Date.now() < endTime)
  return count / ms
}

export default performance

export {
  performance
}
