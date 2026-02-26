'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var chalk = require('chalk');
var fs = require('node:fs');
var node_readline = require('node:readline');
var scope = require('./scope.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var chalk__default = /*#__PURE__*/_interopDefaultLegacy(chalk);
var fs__default = /*#__PURE__*/_interopDefaultLegacy(fs);

function perfocode(output, callback, timeout = scope.scope) {
    const options = { ...Object.assign(scope.scope, typeof timeout === 'number' ? { timeout } : timeout) };
    const readline1 = node_readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    const run = (newOutput = '') => {
        if (newOutput) {
            output = newOutput;
        }
        readline1.close();
        try {
            scope.scope.result = JSON.parse(fs__default["default"].readFileSync(output + '.json'));
        }
        catch { }
        callback();
        const readline2 = node_readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
        if (scope.scope.errors) {
            console.log(`${chalk__default["default"].red(`${scope.scope.errors} error${scope.scope.errors === 1 ? '' : 's'} found! `)}`);
        }
        const save = (save) => {
            if (!save) {
                save = scope.scope.errors ? 'n' : 'y';
            }
            if (['y', 'yes'].includes(save.toLowerCase())) {
                const writeFile = (file) => {
                    fs__default["default"].writeFileSync((file || output) + '.json', JSON.stringify(scope.scope.result, null, 2));
                    readline2.close();
                };
                if (options.noAsk) {
                    writeFile();
                }
                else {
                    readline2.question(`File name. [${chalk__default["default"].cyan(output)}]: `, writeFile);
                }
            }
            else {
                readline2.close();
            }
        };
        if (options.noAsk) {
            save();
        }
        else {
            readline2.question(`Do you want to save results? [${chalk__default["default"].cyan(scope.scope.errors ? 'N' : 'Y')}/${chalk__default["default"].red(scope.scope.errors ? 'y' : 'n')}]: `, save);
        }
    };
    if (options.noAsk) {
        run();
    }
    else {
        readline1.question(`Compare with [${chalk__default["default"].cyan(output)}]: `, run);
    }
}

exports.perfocode = perfocode;
