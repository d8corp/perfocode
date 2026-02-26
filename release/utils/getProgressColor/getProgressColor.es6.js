import chalk from 'chalk';

function getProgressColor(progress, str) {
    if (progress > 15) {
        return chalk.green(str);
    }
    if (progress > 10) {
        return chalk.cyan(str);
    }
    if (progress > 5) {
        return chalk.yellow(str);
    }
    return chalk.red(str);
}

export { getProgressColor };
