import fs from 'fs'
import scope from './scope'

function perfocode (output: string, callback: () => any, timeout = scope.currentTimeout) {
  scope.currentTimeout = timeout
  try {
    scope.result = JSON.parse(fs.readFileSync(output + '.json') as unknown as string)
  } catch (e) {}
  callback()
  fs.writeFileSync(output + '.json', JSON.stringify(scope.result, null, 2))
}

export default perfocode

export {
  perfocode
}
