import chalk from 'chalk'
import fs from 'fs'
import { createInterface } from 'readline'

import { scope } from './scope'
import type { Callback, TimeoutOption } from './type'
import { assignScope } from './utils'

export function perfocode (output: string, callback: Callback, timeout: TimeoutOption = scope) {
  const options = assignScope(timeout)

  // @ts-expect-error Bun
  if (typeof Bun !== 'undefined') {
    // @ts-expect-error Bun
    global.gc ??= Bun.gc
  }

  if (typeof gc === 'undefined' || options.preventGC) {
    console.warn(chalk.yellow('⚠ Use --expose-gc flag for accurate results!'))
  }

  const readline1 = createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  const run = (newOutput = '') => {
    if (newOutput) {
      output = newOutput
    }

    readline1.close()

    try {
      scope.result = JSON.parse(fs.readFileSync(output + '.json') as unknown as string)
    } catch {}

    if (options.throwError) {
      callback()
    } else {
      try {
        callback()
      } catch (e) {
        console.log(chalk.red(`⚠ Error: ${e.message ?? e}`))
      }
    }

    const readline2 = createInterface({
      input: process.stdin,
      output: process.stdout,
    })

    if (scope.errors) {
      console.log(`${chalk.red(`${scope.errors} error${scope.errors === 1 ? '' : 's'} found! `)}`)
    }

    const save = (save?: string) => {
      if (!save) {
        save = scope.errors ? 'n' : 'y'
      }

      if (['y', 'yes'].includes(save.toLowerCase())) {
        const writeFile = (file?: string) => {
          fs.writeFileSync((file || output) + '.json', JSON.stringify(scope.result, null, 2))
          readline2.close()
        }

        if (options.noAsk) {
          writeFile()
        } else {
          readline2.question(`File name. [${chalk.cyan(output)}]: `, writeFile)
        }
      } else {
        readline2.close()
      }
    }

    if (options.noAsk) {
      save()
    } else {
      readline2.question(`Do you want to save results? [${chalk.cyan(scope.errors ? 'N' : 'Y')}/${chalk.red(scope.errors ? 'y' : 'n')}]: `, save)
    }
  }

  if (options.noAsk) {
    run()
  } else {
    readline1.question(`Compare with [${chalk.cyan(output)}]: `, run)
  }
}
