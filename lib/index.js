'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('fs');
require('./scope.js');
var perfocode = require('./perfocode.js');
require('./getDeep.js');
var describe = require('./describe.js');
var test = require('./test.js');
var performance = require('./performance.js');
require('colors');



exports.default = perfocode['default'];
exports.perfocode = perfocode['default'];
exports.describe = describe['default'];
exports.test = test['default'];
exports.performance = performance['default'];
