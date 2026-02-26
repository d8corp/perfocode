import chalk from 'chalk'

import { scope } from './scope'
import { beautifyNumber } from './test'
import type { Callback, TimeoutOption, Winner } from './type'
import { getCurrentResult, getPrefix, getProgressColor } from './utils'

export function describe (name: string, callback: Callback, timeout: TimeoutOption = scope) {
  const prevScope = Object.assign({}, scope)
  Object.assign(scope, typeof timeout === 'number' ? { timeout } : timeout)

  console.log(getPrefix() + '╒ ' + name)
  scope.deep.push(name)
  callback()

  const result = getCurrentResult(scope)

  scope.deep.pop()
  let winner: Winner = { value: 0, name: '' }

  for (const name in result) {
    const { value } = result[name]

    if (typeof value === 'number' && winner.value < value) {
      winner = { value, name }
    }
  }

  if (winner.value) {
    console.log(`${getPrefix()}╘ ${chalk.white(name + ': ')}${chalk.cyan(winner.name)} [${chalk.cyan(beautifyNumber(winner.value))}]`)

    const names = Object.keys(result).sort((a, b) => result[b].value - result[a].value)
    const values = names.map(name => String(beautifyNumber(result[name].value)))
    const percentage = names.map(name => `${beautifyNumber(result[name].value / winner.value * 100, 2)}%`)

    const progress = names.map(name => {
      const progress = Math.round(result[name].value / winner.value * 20)

      return getProgressColor(progress, '▰'.repeat(progress)) + '▱'.repeat(20 - progress)
    })

    const nameSize = Math.max(...names.map(name => name.length))
    const valuesSize = Math.max(...values.map(value => value.length))
    const percentageSize = Math.max(...percentage.map(percentage => percentage.length))

    console.log(`${getPrefix()}┌─${'─'.repeat(nameSize)}─┬─${'─'.repeat(valuesSize)}─┬─${'─'.repeat(20)}─┬─${'─'.repeat(percentageSize)}─┐`)

    names.forEach((testName, index) => {
      console.log(`${getPrefix()}│ ${testName.padEnd(nameSize)} │ ${values[index].padEnd(valuesSize)} │ ${progress[index]} │ ${percentage[index].padEnd(percentageSize)} │`)
    })

    console.log(`${getPrefix()}└─${'─'.repeat(nameSize)}─┴─${'─'.repeat(valuesSize)}─┴─${'─'.repeat(20)}─┴─${'─'.repeat(percentageSize)}─┘`)
  } else {
    console.log(getPrefix() + '╘ ' + chalk.white(name))
  }

  Object.assign(scope, prevScope)
}
