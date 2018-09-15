const chalk = require("chalk");

const colors = {
    warn: "yellow",
    error: "red",
    log: "gray"
};

class Logger {
    constructor() {
        this.enabled = false;
    }

    enable() {
        this.enabled = true;
    }

    log(...args) {
        this.call("log", ...args);
    }

    error(...args) {
        this.call("error", ...args);
    }

    warn(...args) {
        this.call("warn", ...args);
    }

    call(level, ...args) {
        if (!this.enabled) {
            return;
        }

        args.unshift(chalk[colors.log]("HandlebarsPlugin:"));
        console[level](chalk[colors[level]](...args));
    }

    newLine() {
        if (!this.enabled) {
            return;
        }

        console.log();
    }
}

module.exports = new Logger();
