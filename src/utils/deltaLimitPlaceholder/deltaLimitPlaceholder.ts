import chalk from 'chalk'

import { beautifyNumber } from '../beautifyNumber'
import type { PlaceholderResultOverride } from '../placeholder'
import { placeholder } from '../placeholder'

import type { DeltaLimits } from '../../type'

export function deltaLimitPlaceholder<T extends Record<string, any>, L extends { [key in keyof T]?: DeltaLimits }> (
  text: string,
  data: T,
  limits: L,
  override: PlaceholderResultOverride<T, keyof L & string> = v => v,
) {
  const valueOverride = (value: number, id: keyof T, offset: number) => {
    if (id in limits) {
      const start = offset ? ' ' : ''
      const end = offset === text.length - (String(id).length + 2) ? '' : ' '

      return value ? `${start}${value > 0 ? '↑' : '↓'} ${beautifyNumber(Math.abs(value), 1)}%${end}` : ''
    }

    return typeof value === 'number' ? String(beautifyNumber(value, 4)) : String(value)
  }

  const colorOverride = (result: string, value: number, id: keyof T) => {
    if (id in limits) {
      if (!value) return result

      if (value > limits[id].awesome) {
        return chalk.greenBright(result)
      }

      if (value > limits[id].great) {
        return chalk.green(result)
      }

      if (value > limits[id].good) {
        return chalk.cyan(result)
      }

      if (value < limits[id].critical) {
        return chalk.redBright(result)
      }

      if (value < limits[id].bad) {
        return chalk.red(result)
      }

      if (value < limits[id].poor) {
        return chalk.yellow(result)
      }

      return chalk.gray(result)
    }

    return result
  }

  return [placeholder(text, data, valueOverride), placeholder(text, data, valueOverride, (result, id, value, ...rest) => {
    return id in limits ? colorOverride(result, value, id) : override(result, id as any, value, ...rest)
  })] as const
}
