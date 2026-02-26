function performance(callback, ms) {
    let count = 0;
    const endTime = process.hrtime.bigint() + (BigInt(ms) * 1000000n);
    do {
        callback();
        count++;
    } while (process.hrtime.bigint() < endTime);
    return count / ms;
}

export { performance };
