'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('fs');
require('./scope.js');
require('readline');
require('chalk');
var perfocode = require('./perfocode.js');
require('./getDeep.js');
var test = require('./test.js');
var performance = require('./performance.js');
var describe = require('./describe.js');



exports.default = perfocode['default'];
exports.perfocode = perfocode['default'];
exports.test = test['default'];
exports.performance = performance['default'];
exports.describe = describe['default'];
