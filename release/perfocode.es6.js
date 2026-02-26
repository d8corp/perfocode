import chalk from 'chalk';
import fs from 'node:fs';
import { createInterface } from 'node:readline';
import { scope } from './scope.es6.js';

function perfocode(output, callback, timeout = scope) {
    const options = { ...Object.assign(scope, typeof timeout === 'number' ? { timeout } : timeout) };
    const readline1 = createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    const run = (newOutput = '') => {
        if (newOutput) {
            output = newOutput;
        }
        readline1.close();
        try {
            scope.result = JSON.parse(fs.readFileSync(output + '.json'));
        }
        catch { }
        callback();
        const readline2 = createInterface({
            input: process.stdin,
            output: process.stdout,
        });
        if (scope.errors) {
            console.log(`${chalk.red(`${scope.errors} error${scope.errors === 1 ? '' : 's'} found! `)}`);
        }
        const save = (save) => {
            if (!save) {
                save = scope.errors ? 'n' : 'y';
            }
            if (['y', 'yes'].includes(save.toLowerCase())) {
                const writeFile = (file) => {
                    fs.writeFileSync((file || output) + '.json', JSON.stringify(scope.result, null, 2));
                    readline2.close();
                };
                if (options.noAsk) {
                    writeFile();
                }
                else {
                    readline2.question(`File name. [${chalk.cyan(output)}]: `, writeFile);
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
            readline2.question(`Do you want to save results? [${chalk.cyan(scope.errors ? 'N' : 'Y')}/${chalk.red(scope.errors ? 'y' : 'n')}]: `, save);
        }
    };
    if (options.noAsk) {
        run();
    }
    else {
        readline1.question(`Compare with [${chalk.cyan(output)}]: `, run);
    }
}

export { perfocode };
