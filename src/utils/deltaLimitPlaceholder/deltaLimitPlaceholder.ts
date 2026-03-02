import { beautifyNumber } from '../beautifyNumber'
import { getLimitColor } from '../getLimitColor'
import type { PlaceholderResultOverride } from '../placeholder'
import { placeholder } from '../placeholder'

import type { Limit } from '../../type'

export function deltaLimitPlaceholder<T extends Record<string, any>, L extends { [key in keyof T]?: Limit }> (
  text: string,
  data: T,
  limits: L,
  preventColors?: { [key in keyof L]?: boolean },
  override: PlaceholderResultOverride<T, keyof L & string> = v => v,
) {
  const valueOverride = (value: number, id: keyof T, offset: number, match: string) => {
    if (id in limits) {
      const start = offset ? ' ' : ''
      const end = offset === text.length - (String(id).length + 2) ? '' : ' '

      return value ? `${start}${value > 0 ? '↑' : '↓'} ${beautifyNumber(Math.abs(value), 1)}%${end}` : ''
    }

    if (id in data) {
      return typeof value === 'number' ? String(beautifyNumber(value, 4)) : String(value)
    }

    return match
  }

  const colorOverride = (result: string, value: number, id: keyof T) => {
    if (id in limits) {
      return getLimitColor(value, result, limits[id])
    }

    return result
  }

  return [placeholder(text, data, valueOverride), placeholder(text, data, valueOverride, (result, id, value, ...rest) => {
    if (preventColors[id]) return override(result, id as any, value, ...rest)

    return id in limits ? colorOverride(result, value, id) : id in data ? override(result, id as any, value, ...rest) : result
  })] as const
}
