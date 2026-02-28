import chalk from 'chalk'

import { scope } from './scope'
import type { Callback, Result, TimeoutOption, Winner } from './type'
import {
  assignScope,
  beautifyNumber,
  deltaLimitPlaceholder,
  getCurrentResult,
  getDeltaColor,
  getPrefix,
  getProgressColor,
} from './utils'

export function describe (name: string, callback: Callback, timeout: TimeoutOption = scope) {
  const prevScope = Object.assign({}, scope)
  const options = assignScope(timeout)

  console.log(getPrefix() + '╒ ' + name)
  scope.deep.push(name)

  let failed = false

  if (options.throwError) {
    callback()
  } else {
    try {
      callback()
    } catch (e) {
      console.log(`${getPrefix()} ${chalk.red(`⚠ ${e.message ?? e}`)}`)
      scope.errors++
      failed = true
    }
  }

  const failedMessage = failed ? chalk.red(' ⚠ Broken group') : ''
  const result = getCurrentResult(scope) as Record<string, Result>

  scope.deep.pop()
  let winner: Winner = { value: 0, name: '' }

  for (const name in result) {
    const { value } = result[name]

    if (typeof value === 'number' && winner.value < value) {
      winner = { value, name }
    }
  }

  if (winner.value) {
    const names = Object.keys(result).sort((a, b) => result[b].value - result[a].value)
    const errors = names.map(name => result[name].error)

    const limits = {
      minDelta: options.limits.minDelta,
      maxDelta: options.limits.maxDelta,
      currentDelta: options.limits.currentDelta,
      valueDelta: options.limits.valueDelta,
    }

    const rows = names.map(name => {
      const { min, max, prevMin, prevMax, current, value, prev, error, success } = result[name]
      const progress = value / winner.value * 100
      const count = Math.ceil(progress / 5)
      const delta = (max - min) / max * 100

      const data = {
        delta: `${beautifyNumber(delta, 1)}%`,
        deltaIcon: 'Δ',
        min,
        max,
        minDelta: (min - prevMin) / prevMin * 100,
        maxDelta: (max - prevMax) / prevMax * 100,
        current,
        currentDelta: (current - value) / value * 100,
        value,
        valueDelta: (value - prev) / prev * 100,
        progressStart: '▰'.repeat(count),
        progressEnd: '▱'.repeat(20 - count),
        statusIcon: error ? '✘' : success ? '✔' : '⚠',
        progressDelta: progress,
        prev,
        name,
      }

      return options.columns.map(mask => deltaLimitPlaceholder(mask, data, limits, (result, id) => {
        if (['delta', 'deltaIcon'].includes(id)) return getDeltaColor(delta, result, options.limits.delta)
        if (id === 'min') return data.minDelta ? result : chalk.gray(result)
        if (id === 'max') return data.maxDelta ? result : chalk.gray(result)
        if (id === 'current') return data.currentDelta ? result : chalk.gray(result)
        if (id === 'value') return data.valueDelta ? result : chalk.gray(result)
        if (['statusIcon', 'progressStart'].includes(id)) return getProgressColor(progress, result, options.limits.progress)

        return result
      }))
    })

    const sizes = options.columns.map((_, index) => Math.max(...rows.map((columns) => columns[index][0].length)))

    const errorsSize = errors.filter(Boolean).length

    const border = options.columns.map((_, index) => '─'.repeat(sizes[index]))
    const header = `${getPrefix()}│┌─${border.join('─┬─')}─┐`
    const footer = `${getPrefix()}│└─${border.join('─┴─')}─┘`

    console.log(header)

    rows.forEach((columns, index) => {
      const text = ` ${columns.map(([raw, text], index) => text + ' '.repeat(sizes[index] - raw.length)).join(' │ ')} `

      console.log(`${getPrefix()}││${result[names[index]].highlight ? chalk.bgBlackBright(text) : text}│`)
    })

    console.log(footer)

    console.log(`${getPrefix()}╘ ${chalk.white(name + `:${failedMessage} `)}${errorsSize ? chalk.red(`⚠ Broken ${errorsSize} test${errorsSize > 1 ? 's' : ''} `) : ''}${chalk.cyan(winner.name)} [${chalk.cyan(beautifyNumber(winner.value))}]`)
  } else {
    console.log(getPrefix() + '╘ ' + chalk.white(name) + failedMessage)
  }

  Object.assign(scope, prevScope)
}
