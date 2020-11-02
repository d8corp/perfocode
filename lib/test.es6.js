import scope from './scope.es6.js';
import getDeep from './getDeep.es6.js';
import performance from './performance.es6.js';
import colors from 'colors';

function test(test, callback, timeout = scope.currentTimeout) {
    const value = performance(callback, timeout);
    let minColor = colors.gray;
    let maxColor = colors.gray;
    let beforeMin = '';
    let beforeMax = '';
    let object = scope.result;
    for (const name of scope.deep) {
        if (!(name in object)) {
            object[name] = {};
        }
        object = object[name];
    }
    let deepPrefix = getDeep();
    if (deepPrefix) {
        deepPrefix = deepPrefix.slice(0, -1) + '╞';
    }
    if (test in object) {
        if (value < object[test].min) {
            minColor = colors.red;
            beforeMin = colors.gray(object[test].min + ' < ');
            object[test].min = value;
        }
        else if (value > object[test].max) {
            maxColor = colors.green;
            beforeMax = colors.gray(' > ' + object[test].max);
            object[test].max = value;
        }
        console.log(`${deepPrefix} ${test}: ${minColor(`${object[test].min} < `)}${beforeMin}${value}${beforeMax}${maxColor(` > ${object[test].max}`)}`);
    }
    else {
        object[test] = {
            min: value,
            max: value,
        };
        console.log(`${deepPrefix} ${test}: ${value}`);
    }
}

export default test;
export { test };
