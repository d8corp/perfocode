import chalk from 'chalk'

import { scope } from './scope'
import type { Callback, Options } from './type'
import {
  assignScope,
  beautifyNumber,
  getCurrentResult,
  getLimitColor,
  getPrefix,
  performance,
} from './utils'

export interface TestOptions extends Options {
  highlight?: boolean
}

export function test (test: string, callback: Callback, timeout: TestOptions | number = scope) {
  const { highlight, ...rest } = typeof timeout === 'number' ? { timeout } : timeout
  const options = assignScope(rest)

  if (!options.preventGC && typeof gc !== 'undefined') {
    gc()
  }

  let value = 0

  const object = getCurrentResult(scope)
  const deepPrefix = getPrefix().slice(0, -1) + '╞'
  const logging = options.logging || !scope.deep.length

  if (options.throwError) {
    value = performance(callback, options.timeout)
  } else {
    try {
      value = performance(callback, options.timeout)
    } catch (e) {
      console.log(`${deepPrefix} ${chalk.red(`${test}: ⚠ ${e.message ?? e}`)}`)
      scope.errors++

      object[test] = {
        ...object[test],
        error: e,
      }

      return
    }
  }

  function log (result: string | number, average?: number, delta?: number) {
    const deltaText = delta ? getLimitColor(delta, ` (Δ ${beautifyNumber(delta, 2)}%)`, options.limits.delta) : ''

    console.log(`${deepPrefix} ${chalk.yellow(test)}${average ? ` [${chalk.yellow(beautifyNumber(average))}]` : ''}: ${result}${deltaText}`)
  }

  if (test in object) {
    object[test].success = Symbol('Success')
    object[test].prev = object[test].value
    object[test].current = value
    object[test].prevMin = object[test].min
    object[test].prevMax = object[test].max
    object[test].highlight = highlight

    const { min, max } = object[test]
    const averageValue = object[test].value = (object[test].value + value) / 2
    const currentMin = Math.min(min, value)
    const currentMax = Math.max(min, value)
    const delta = (currentMax - currentMin) / currentMax * 100

    if (value < min) {
      object[test].min = value

      if (logging) {
        const level = ((min - value) * 10 / min) | 0
        let arrow = '<'

        for (let i = 0; i < level; i++) {
          arrow += '<'
        }

        if (min === max) {
          log(`${chalk.red(`${beautifyNumber(value)} ${arrow}`)} ${chalk.gray(`${beautifyNumber(min)}`)}`, averageValue, delta)
        } else {
          log(`${chalk.red(`${beautifyNumber(value)} ${arrow}`)} ${chalk.gray(`${beautifyNumber(min)} < ${beautifyNumber(max)}`)}`, averageValue, delta)
        }
      }
    } else if (value > max) {
      object[test].max = value

      if (logging) {
        const level = ((value - max) * 10 / value) | 0
        let arrow = '<'

        for (let i = 0; i < level; i++) {
          arrow += '<'
        }

        if (min === max) {
          log(`${chalk.gray(beautifyNumber(min))} ${chalk.green(arrow + ` ${beautifyNumber(value)}`)}`, averageValue, delta)
        } else {
          log(`${chalk.gray(beautifyNumber(min) + ' < ' + beautifyNumber(max))} ${chalk.green(arrow + ` ${beautifyNumber(value)}`)}`, averageValue, delta)
        }
      }
    } else if (logging) {
      if (min === max) {
        log(beautifyNumber(value))
      } else {
        log(`${chalk.gray(beautifyNumber(min) + ' <')} ${beautifyNumber(value)} ${chalk.gray('< ' + beautifyNumber(max))}`, averageValue, delta)
      }
    }
  } else {
    object[test] = {
      min: value,
      max: value,
      prevMin: value,
      prevMax: value,
      value,
      prev: value,
      current: value,
      success: Symbol('Success'),
      highlight,
    }

    if (logging) {
      log(beautifyNumber(value))
    }
  }

  if (!options.preventGC && typeof gc !== 'undefined') {
    gc()
  }
}
