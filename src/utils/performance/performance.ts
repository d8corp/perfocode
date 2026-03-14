import type { AfterCall, Call } from '../../type'

export function performance<A extends boolean = false, B extends boolean = false> (call: Call<A, B>, ms: number, useBefore: B, useAfter: A): number {
  let count = 0
  let spendTime = 0n
  const endTime = process.hrtime.bigint() + (BigInt(ms) * 1_000_000n)

  do {
    const test = useBefore ? call() as AfterCall : call

    const beforeTime = process.hrtime.bigint()
    const result = test()
    spendTime += process.hrtime.bigint() - beforeTime
    count++

    if (useAfter && typeof result === 'function') {
      result()
    }
  } while (process.hrtime.bigint() < endTime)

  const spendMs = Number(spendTime / 1_000_000n)

  return spendMs ? count / spendMs : 0
}
