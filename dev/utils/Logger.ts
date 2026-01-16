import chalk from "chalk";

import { DEBUG } from "../globals";

export default class Logger {
    public static error(...content: unknown[]) {
        console.log(chalk.yellow("> ") + chalk.red(...content));
    }
    public static log(...content: unknown[]) {
        console.log(chalk.yellow("> ") + chalk.white(...content));
    }
    public static debug(...content: unknown[]) {
        if (DEBUG) console.log(chalk.yellow("> ") + chalk.yellow(...content));
    }
}
