export function beautifyNumber (num: number, decimal = 4) {
  return parseFloat(num.toFixed(decimal))
}
