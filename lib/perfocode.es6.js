import fs from 'fs';
import scope from './scope.es6.js';
import { createInterface } from 'readline';
import chalk from 'chalk';

function perfocode(output, callback, timeout = scope.currentTimeout) {
    scope.currentTimeout = timeout;
    const readline1 = createInterface({
        input: process.stdin,
        output: process.stdout
    });
    readline1.question(`Compare with [${chalk.cyan(output)}]: `, newOutput => {
        if (newOutput) {
            output = newOutput;
        }
        readline1.close();
        try {
            scope.result = JSON.parse(fs.readFileSync(output + '.json'));
        }
        catch (e) { }
        callback();
        const readline2 = createInterface({
            input: process.stdin,
            output: process.stdout
        });
        readline2.question(`Do you want to save results? [${chalk.cyan('Y')}/${chalk.red('n')}]: `, save => {
            if (!save || save !== 'n') {
                readline2.question(`File name. [${chalk.cyan(output)}]: `, file => {
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

export default perfocode;
export { perfocode };
