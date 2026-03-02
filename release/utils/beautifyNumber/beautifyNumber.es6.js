function beautifyNumber(num, decimal = 4) {
    return parseFloat(num.toFixed(decimal));
}

export { beautifyNumber };
