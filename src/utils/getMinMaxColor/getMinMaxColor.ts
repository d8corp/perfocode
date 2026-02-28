import chalk from 'chalk'

import type { Result } from '../../type'

export function getMinMaxColor (str: string, result: Result) {
  if (![result.min, result.max].includes(result.current)) return chalk.gray(str)

  const trim = str.trim()
  const spaceSize = str.length - trim.length
  const spaceEnd = ' '.repeat(spaceSize)
  const split = trim.split('-')

  if (result.min === result.current) {
    return `${split[0]}-${chalk.gray(split[1])}` + spaceEnd
  } else {
    return `${chalk.gray(split[0])}-${split[1]}` + spaceEnd
  }
}
