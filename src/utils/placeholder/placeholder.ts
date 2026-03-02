const PLACEHOLDER_REG = /{([a-zA-Z0-9]+)}/g

export type PlaceholderValueOverride<T extends Record<string, any>> = <K extends keyof T, V extends T[K]>(
  value: V,
  id: K,
  offset: number,
  match: string,
  data: T,
  text: string,
) => string

export type PlaceholderResultOverride<T extends Record<string, any>, E extends keyof T = never> = <K extends keyof T, V extends T[K]>(
  result: string,
  id: Exclude<K, E>,
  value: V,
  data: T,
  offset: number,
  match: string,
  text: string,
) => string

export function placeholder<T extends Record<string, any>> (
  text: string,
  data: T,
  valueOverride: PlaceholderValueOverride<T> = String,
  resultOverride: PlaceholderResultOverride<T> = (v) => v,
): string {
  return text.replace(
    PLACEHOLDER_REG,
    (match, id, offset, text) => {
      return resultOverride(valueOverride(data[id], id, offset, match, data, text), id, data[id], data, offset, match, text)
    },
  )
}
