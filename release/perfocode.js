'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var chalk = require('chalk');
var fs = require('node:fs');
var node_readline = require('node:readline');
var scope = require('./scope.js');
require('./utils/index.js');
var assignScope = require('./utils/assignScope/assignScope.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var chalk__default = /*#__PURE__*/_interopDefaultLegacy(chalk);
var fs__default = /*#__PURE__*/_interopDefaultLegacy(fs);

function perfocode(params, callback, timeout = scope.scope.timeout) {
    let { output = params, call = callback, ...rest } = typeof timeout === 'number'
        ? { timeout }
        : callback
            ? timeout
            : params;
    const options = assignScope.assignScope(rest);
    // @ts-expect-error Bun
    if (typeof Bun !== 'undefined') {
        // @ts-expect-error Bun
        global.gc ??= Bun.gc;
    }
    if (typeof gc === 'undefined' || options.preventGC) {
        console.warn(chalk__default["default"].yellow('⚠ Use --expose-gc flag for accurate results!'));
    }
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
        if (options.throwError) {
            call();
        }
        else {
            try {
                call();
            }
            catch (e) {
                console.log(chalk__default["default"].red(`⚠ Error: ${e.message ?? e}`));
            }
        }
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
