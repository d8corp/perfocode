import chalk from 'chalk'

import { scope } from './scope'
import type { Call, Options } from './type'
import {
  assignScope,
  beautifyNumber,
  getCurrentResult,
  getLimitColor,
  getPrefix,
  performance,
} from './utils'

export interface TestOptions<A extends boolean = false, B extends boolean = false> extends Options {
  highlight?: boolean
  useBefore?: B
  useAfter?: A
}

export interface TestParams<A extends boolean = false, B extends boolean = false> extends TestOptions<A, B> {
  name: string
  call: Call<A, B>
}

export function test<A extends boolean = false, B extends boolean = false> (name: string, call: Call<A, B>, timeout?: TestOptions | number): void
export function test<A extends boolean = false, B extends boolean = false> (params: TestParams<A, B>): void

export function test<A extends boolean = false, B extends boolean = false> (
  testName: string | TestParams<A, B>,
  callback?: Call<A, B>,
  timeout: TestOptions<A, B> | number = scope.timeout,
) {
  const { name = testName as string, call = callback, highlight, useAfter, useBefore, ...rest } = typeof timeout === 'number'
    ? { timeout }
    : callback
      ? timeout as TestParams<A, B>
      : testName as TestParams<A, B>

  const options = assignScope(rest)

  if (!options.preventGC && typeof gc !== 'undefined') {
    gc()
  }

  let value = 0

  const object = getCurrentResult(scope)
  const deepPrefix = getPrefix().slice(0, -1) + '╞'
  const logging = options.logging || !scope.deep.length

  if (options.throwError) {
    value = performance(call, options.timeout, useBefore, useAfter)
  } else {
    try {
      value = performance(call, options.timeout, useBefore, useAfter)
    } catch (e) {
      console.log(`${deepPrefix} ${chalk.red(`${name}: ⚠ ${e.message ?? e}`)}`)
      scope.errors++

      object[name] = {
        ...object[name],
        error: e,
      }

      return
    }
  }

  function log (result: string | number, average?: number, delta?: number) {
    const deltaText = delta ? getLimitColor(delta, ` (Δ ${beautifyNumber(delta, 2)}%)`, options.limits.delta) : ''

    console.log(`${deepPrefix} ${chalk.yellow(name)}${average ? ` [${chalk.yellow(beautifyNumber(average))}]` : ''}: ${result}${deltaText}`)
  }

  if (name in object) {
    object[name].success = Symbol('Success')
    object[name].prev = object[name].value
    object[name].current = value
    object[name].prevMin = object[name].min
    object[name].prevMax = object[name].max
    object[name].highlight = highlight

    const { min, max } = object[name]
    const averageValue = object[name].value = (object[name].value + value) / 2
    const currentMin = Math.min(min, value)
    const currentMax = Math.max(min, value)
    const delta = (currentMax - currentMin) / currentMax * 100

    if (value < min) {
      object[name].min = value

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
      object[name].max = value

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
    object[name] = {
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
