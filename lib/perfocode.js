'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var fs = require('fs');
var scope = require('./scope.js');
var readline = require('readline');
var chalk = require('chalk');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var fs__default = /*#__PURE__*/_interopDefaultLegacy(fs);
var chalk__default = /*#__PURE__*/_interopDefaultLegacy(chalk);

function perfocode(output, callback, timeout) {
    if (timeout === void 0) { timeout = scope['default'].currentTimeout; }
    scope['default'].currentTimeout = timeout;
    var readline1 = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    readline1.question("Compare with [" + chalk__default['default'].cyan(output) + "]: ", function (newOutput) {
        if (newOutput) {
            output = newOutput;
        }
        readline1.close();
        try {
            scope['default'].result = JSON.parse(fs__default['default'].readFileSync(output + '.json'));
        }
        catch (e) { }
        callback();
        var readline2 = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        readline2.question("Do you want to save results? [" + chalk__default['default'].cyan('Y') + "/" + chalk__default['default'].red('n') + "]: ", function (save) {
            if (!save || save !== 'n') {
                readline2.question("File name. [" + chalk__default['default'].cyan(output) + "]: ", function (file) {
                    fs__default['default'].writeFileSync((file || output) + '.json', JSON.stringify(scope['default'].result, null, 2));
                    readline2.close();
                });
            }
            else {
                readline2.close();
            }
        });
    });
}

exports.default = perfocode;
exports.perfocode = perfocode;
