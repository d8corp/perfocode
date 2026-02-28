import chalk from 'chalk'

import type { MinMaxDeltaLimits } from '../../type'

export function getDeltaColor (delta: number, str: string, limits: MinMaxDeltaLimits) {
  if (delta < limits.warning) {
    return chalk.gray(str)
  }

  if (delta < limits.error) {
    return chalk.yellow(str)
  }

  return chalk.red(str)
}
