import scope from './scope'
import getDeep from './getDeep'
import chalk from 'chalk'
import {beautifyNumber} from './test'

function getProgressColor (progress: number, str: string) {
  if (progress > 15) {
    return chalk.green(str)
  }

  if (progress > 10) {
    return chalk.cyan(str)
  }

  if (progress > 5) {
    return chalk.yellow(str)
  }

  return chalk.red(str)
}

function describe (name: string, callback: () => any, timeout = scope.currentTimeout) {
  const beforeTimeout = scope.currentTimeout
  scope.currentTimeout = timeout
  console.log(getDeep() + '╒ ' + name)
  scope.deep.push(name)
  callback()
  let {result} = scope
  for (let i = 0; i < scope.deep.length; i++) {
    result = result[scope.deep[i]]
  }
  scope.deep.pop()
  let winner = {value: 0, name: ''}
  for (const name in result) {
    const {value} = result[name]
    if (typeof value === 'number' && winner.value < value) {
      winner = {value, name}
    }
  }
  if (winner.value) {
    console.log(`${getDeep()}╘ ${chalk.white(name + ': ')}${chalk.cyan(winner.name)} [${chalk.cyan(beautifyNumber(winner.value))}]`)

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

    console.log(`${getDeep()}┌─${'─'.repeat(nameSize)}─┬─${'─'.repeat(valuesSize)}─┬─${'─'.repeat(20)}─┬─${'─'.repeat(percentageSize)}─┐`)
    names.forEach((testName, index) => {
      console.log(`${getDeep()}│ ${testName.padEnd(nameSize)} │ ${values[index].padEnd(valuesSize)} │ ${progress[index]} │ ${percentage[index].padEnd(percentageSize)} │`)
    })
    console.log(`${getDeep()}└─${'─'.repeat(nameSize)}─┴─${'─'.repeat(valuesSize)}─┴─${'─'.repeat(20)}─┴─${'─'.repeat(percentageSize)}─┘`)
  } else {
    console.log(getDeep() + '╘ ' + chalk.white(name))
  }
  scope.currentTimeout = beforeTimeout
}

export default describe

export {
  describe
}
