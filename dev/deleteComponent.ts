/**
 * Utility to quickly delete a new component
 */
import fs from "fs";
import readline from "readline-sync";
import chalk from "chalk";
import path from "path";

import { config } from "./globals";
import Logger from "./utils/Logger";

function deleteComponent(name: string, rootDir: string) {
    const componentDir = path.join(rootDir, name);

    if (
        readline
            .question(`Is this path correct ${chalk.blue(componentDir)} [y/N] : `)
            .toLowerCase()[0] !== "y"
    ) {
        Logger.log("Component", name, "not deleted!");
        return;
    }

    fs.rmSync(componentDir, {
        recursive: true,
        force: true,
    });
    Logger.log("Component", chalk.blue(name), "deleted!");
}

function main() {
    let componentName = readline.question("Name of component to delete: ").trim();
    if (componentName.length === 0) {
        Logger.error("Component name cannot be blank!");
        process.exit();
    }

    if (componentName.includes(" ")) {
        Logger.error("Component name cannot contain space!");
        process.exit();
    }

    if (config.auto_title) {
        componentName = componentName.charAt(0).toUpperCase() + componentName.slice(1);
    }

    deleteComponent(componentName, config.components_dir);
}

main();
