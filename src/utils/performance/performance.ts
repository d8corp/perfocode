export function performance (callback: () => void, ms: number): number {
  let count = 0
  const endTime = process.hrtime.bigint() + (BigInt(ms) * 1_000_000n)

  do {
    callback()
    count++
  } while (process.hrtime.bigint() < endTime)

  return count / ms
}
