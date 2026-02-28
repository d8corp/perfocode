import chalk from 'chalk'

import type { ProgressLimits } from '../../type'

export function getProgressColor (progress: number, str: string, limits: ProgressLimits) {
  if (progress > limits.good) {
    return chalk.green(str)
  }

  if (progress > limits.warning) {
    return chalk.cyan(str)
  }

  if (progress > limits.error) {
    return chalk.yellow(str)
  }

  return chalk.red(str)
}
