function performance(call, ms, useBefore, useAfter) {
    let count = 0;
    let spendTime = 0n;
    const endTime = process.hrtime.bigint() + (BigInt(ms) * 1000000n);
    do {
        const test = useBefore ? call() : call;
        const beforeTime = process.hrtime.bigint();
        const result = test();
        spendTime += process.hrtime.bigint() - beforeTime;
        count++;
        if (useAfter && typeof result === 'function') {
            result();
        }
    } while (process.hrtime.bigint() < endTime);
    const spendMs = Number(spendTime / 1000000n);
    return spendMs ? count / spendMs : 0;
}

export { performance };
