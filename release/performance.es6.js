import scope from './scope.es6.js';

function performance(callback, ms) {
    if (ms === void 0) { ms = scope.currentTimeout; }
    var count = 0;
    var endTime = Date.now() + ms;
    do {
        callback();
        count++;
    } while (Date.now() < endTime);
    return count / ms;
}

export { performance as default, performance };
