'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var describe = require('./describe.js');
var perfocode = require('./perfocode.js');
var scope = require('./scope.js');
var test = require('./test.js');
require('./type.js');
require('./utils/index.js');
var getCurrentResult = require('./utils/getCurrentResult/getCurrentResult.js');
var getPrefix = require('./utils/getPrefix/getPrefix.js');
var getProgressColor = require('./utils/getProgressColor/getProgressColor.js');
var performance = require('./utils/performance/performance.js');



exports.describe = describe.describe;
exports.perfocode = perfocode.perfocode;
exports.scope = scope.scope;
exports.beautifyNumber = test.beautifyNumber;
exports.test = test.test;
exports.getCurrentResult = getCurrentResult.getCurrentResult;
exports.getPrefix = getPrefix.getPrefix;
exports.getProgressColor = getProgressColor.getProgressColor;
exports.performance = performance.performance;
