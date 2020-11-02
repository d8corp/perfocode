import scope from './scope.es6.js';
import getDeep from './getDeep.es6.js';

function describe(name, callback, timeout = scope.currentTimeout) {
    const beforeTimeout = scope.currentTimeout;
    scope.currentTimeout = timeout;
    console.log(getDeep() + '╒ ' + name);
    scope.deep.push(name);
    callback();
    scope.deep.pop();
    console.log(getDeep() + '╘ ' + name);
    scope.currentTimeout = beforeTimeout;
}

export default describe;
export { describe };
