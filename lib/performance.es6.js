import scope from './scope.es6.js';

function performance(callback, ms = scope.currentTimeout) {
    let count = 0;
    const endTime = Date.now() + ms;
    do {
        callback();
        count++;
    } while (Date.now() < endTime);
    return count / ms;
}

export default performance;
export { performance };
