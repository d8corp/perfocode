import scope from './scope'
import performance from './performance'
import getDeep from './getDeep'
import chalk from 'chalk'

export function beautifyNumber (num: number, decimal = 4) {
  return parseFloat(num.toFixed(decimal))
}

function test (test: string, callback: () => any, timeout = scope.currentTimeout) {
  const value = performance(callback, timeout)
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
  function log (result: string | number, average?: number) {
    console.log(`${deepPrefix} ${chalk.yellow(test)}${average ? ` [${chalk.yellow(beautifyNumber(average))}]` : ''}: ${result}`)
  }
  if (test in object) {
    const {min, max} = object[test]
    const averageValue = object[test].value = (object[test].value + value) / 2

    if (value < min) {
      const level = ((min - value) * 10 / min) | 0
      let arrow = '<'
      for (let i = 0; i < level; i++) {
        arrow += '<'
      }
      if (min === max) {
        log(`${chalk.red(`${beautifyNumber(value)} ${arrow}`)} ${chalk.gray(`${beautifyNumber(min)}`)}`, averageValue)
      } else {
        log(`${chalk.red(`${beautifyNumber(value)} ${arrow}`)} ${chalk.gray(`${beautifyNumber(min)} < ${beautifyNumber(max)}`)}`, averageValue)
      }
      object[test].min = value
    } else if (value > max) {
      object[test].max = value
      const level = ((value - max) * 10 / value) | 0
      let arrow = '<'
      for (let i = 0; i < level; i++) {
        arrow += '<'
      }
      if (min === max) {
        log(`${chalk.gray(beautifyNumber(min))} ${chalk.green(arrow + ` ${beautifyNumber(value)}`)}`, averageValue)
      } else {
        log(`${chalk.gray(beautifyNumber(min) + ' < ' + beautifyNumber(max))} ${chalk.green(arrow + ` ${beautifyNumber(value)}`)}`, averageValue)
      }
    } else if (min === max) {
      log(beautifyNumber(value))
    } else {
      log(`${chalk.gray(beautifyNumber(min) + ' <')} ${beautifyNumber(value)} ${chalk.gray('< ' + beautifyNumber(max))}`, averageValue)
    }
  } else {
    object[test] = {
      min: value,
      max: value,
      value,
    }

    log(beautifyNumber(value))
  }
}

export default test

export {
  test
}
