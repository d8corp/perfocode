import fs from 'fs';
import scope from './scope.es6.js';

function perfocode(output, callback, timeout = scope.currentTimeout) {
    scope.currentTimeout = timeout;
    try {
        scope.result = JSON.parse(fs.readFileSync(output + '.json'));
    }
    catch (e) { }
    callback();
    fs.writeFileSync(output + '.json', JSON.stringify(scope.result, null, 2));
}

export default perfocode;
export { perfocode };
