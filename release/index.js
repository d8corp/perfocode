'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var describe = require('./describe.js');
var perfocode = require('./perfocode.js');
var scope = require('./scope.js');
var test = require('./test.js');
require('./type.js');
require('./utils/index.js');
var assignScope = require('./utils/assignScope/assignScope.js');
var beautifyNumber = require('./utils/beautifyNumber/beautifyNumber.js');
var deltaLimitPlaceholder = require('./utils/deltaLimitPlaceholder/deltaLimitPlaceholder.js');
var getCurrentResult = require('./utils/getCurrentResult/getCurrentResult.js');
var getLimitColor = require('./utils/getLimitColor/getLimitColor.js');
var getPrefix = require('./utils/getPrefix/getPrefix.js');
var performance = require('./utils/performance/performance.js');
var placeholder = require('./utils/placeholder/placeholder.js');



exports.describe = describe.describe;
exports.perfocode = perfocode.perfocode;
exports.defaultLimits = scope.defaultLimits;
exports.scope = scope.scope;
exports.test = test.test;
exports.assignScope = assignScope.assignScope;
exports.beautifyNumber = beautifyNumber.beautifyNumber;
exports.deltaLimitPlaceholder = deltaLimitPlaceholder.deltaLimitPlaceholder;
exports.getCurrentResult = getCurrentResult.getCurrentResult;
exports.getLimitColor = getLimitColor.getLimitColor;
exports.getPrefix = getPrefix.getPrefix;
exports.performance = performance.performance;
exports.placeholder = placeholder.placeholder;
