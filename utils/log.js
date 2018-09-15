const chalk = require("chalk");

class Logger {
    constructor() {
        this.enabled = false;
    }

    enable() {
        this.enabled = true;
    }

    log(...args) {
        if (!this.enabled) {
            return;
        }

        args.unshift(chalk.gray("HandlebarsPlugin:"));
        console.log.apply(console, args);
    }
}

module.exports = new Logger();
