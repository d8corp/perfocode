import chalk from 'chalk'

export function getDeltaColor (delta: number, str: string) {
  if (delta < 5) {
    return chalk.green(str)
  }

  if (delta < 10) {
    return chalk.cyan(str)
  }

  if (delta < 20) {
    return chalk.yellow(str)
  }

  return chalk.red(str)
}
