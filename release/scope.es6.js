const scope = {
    deep: [],
    result: {},
    errors: 0,
    timeout: process.env.PERFOCODE_TIMEOUT ? Number(process.env.PERFOCODE_TIMEOUT) : 300,
    throwError: process.env.PERFOCODE_THROW_ERROR ? process.env.PERFOCODE_THROW_ERROR === 'true' : false,
    noAsk: process.env.PERFOCODE_NO_ASK ? process.env.PERFOCODE_NO_ASK === 'true' : false,
};

export { scope };
