import chalk from 'chalk'

import type { Limit } from '../../type'

export function getLimitColor (value: number, result: string, limits: Limit, changed = false) {
  if (!value) return changed ? result : chalk.dim(result)

  if (limits.invert ? value < limits.awesome : value > limits.awesome) {
    return chalk.cyan(result)
  }

  if (limits.invert ? value < limits.great : value > limits.great) {
    return chalk.green(result)
  }

  if (limits.invert ? value < limits.good : value > limits.good) {
    return chalk.greenBright.dim(result)
  }

  if (limits.invert ? value > limits.critical : value < limits.critical) {
    return chalk.red(result)
  }

  if (limits.invert ? value > limits.bad : value < limits.bad) {
    return chalk.yellow(result)
  }

  if (limits.invert ? value > limits.poor : value < limits.poor) {
    return chalk.yellowBright.dim(result)
  }

  if (value > limits.normal) {
    return result
  }

  return changed ? result : chalk.dim(result)
}
