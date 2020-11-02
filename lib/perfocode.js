'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var fs = require('fs');
var scope = require('./scope.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var fs__default = /*#__PURE__*/_interopDefaultLegacy(fs);

function perfocode(output, callback, timeout) {
    if (timeout === void 0) { timeout = scope['default'].currentTimeout; }
    scope['default'].currentTimeout = timeout;
    try {
        scope['default'].result = JSON.parse(fs__default['default'].readFileSync(output + '.json'));
    }
    catch (e) { }
    callback();
    fs__default['default'].writeFileSync(output + '.json', JSON.stringify(scope['default'].result, null, 2));
}

exports.default = perfocode;
exports.perfocode = perfocode;
