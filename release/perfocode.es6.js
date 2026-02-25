import fs from 'node:fs';
import scope from './scope.es6.js';
import { createInterface } from 'node:readline';
import chalk from 'chalk';

function perfocode(output, callback, timeout) {
    if (timeout === void 0) { timeout = scope.currentTimeout; }
    scope.currentTimeout = timeout;
    var readline1 = createInterface({
        input: process.stdin,
        output: process.stdout
    });
    readline1.question("Compare with [".concat(chalk.cyan(output), "]: "), function (newOutput) {
        if (newOutput) {
            output = newOutput;
        }
        readline1.close();
        try {
            scope.result = JSON.parse(fs.readFileSync(output + '.json'));
        }
        catch (e) { }
        callback();
        var readline2 = createInterface({
            input: process.stdin,
            output: process.stdout
        });
        readline2.question("Do you want to save results? [".concat(chalk.cyan('Y'), "/").concat(chalk.red('n'), "]: "), function (save) {
            if (!save || save !== 'n') {
                readline2.question("File name. [".concat(chalk.cyan(output), "]: "), function (file) {
                    fs.writeFileSync((file || output) + '.json', JSON.stringify(scope.result, null, 2));
                    readline2.close();
                });
            }
            else {
                readline2.close();
            }
        });
    });
}

export { perfocode as default, perfocode };
