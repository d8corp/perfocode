import scope from './scope'
import performance from './performance'
import getDeep from './getDeep'
import colors from 'colors'

function test (test: string, callback: () => any, timeout = scope.currentTimeout) {
  const value = performance(callback, timeout)
  let minColor = colors.gray
  let maxColor = colors.gray
  let beforeMin = ''
  let beforeMax = ''
  let afterMin = ''
  let afterMax = ''
  let object = scope.result
  for (const name of scope.deep) {
    if (!(name in object)) {
      object[name] = {}
    }
    object = object[name]
  }
  let deepPrefix = getDeep()
  if (deepPrefix) {
    deepPrefix = deepPrefix.slice(0, -1) + '╞'
  }
  if (test in object) {
    if (value < object[test].min) {
      minColor = colors.red
      beforeMin = colors.gray(object[test].min + ' < ')
      object[test].min = value
    } else if (value > object[test].max) {
      maxColor = colors.green
      beforeMax = colors.gray(' > ' + object[test].max)
      object[test].max = value
    }
    console.log(`${deepPrefix} ${test}: ${minColor(`${object[test].min} < `)}${beforeMin}${value}${beforeMax}${maxColor(` > ${object[test].max}`)}`)
  } else {
    object[test] = {
      min: value,
      max: value,
    }
    console.log(`${deepPrefix} ${test}: ${value}`)
  }
}

export default test

export {
  test
}
