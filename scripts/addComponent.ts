/**
 * Utility to quickly generate a new component
 */

import chalk from "chalk";
import process from "process";
import fs  from "fs";
import path from "path";
import readline from "readline-sync";

const config: Config = {
    auto_title: true,
    components_dir: "src/components",
    component_structure: []
};

class Logger {
    public static error(...content: string[]) {
        console.log(chalk.yellow("> ") + chalk.red(...content));
    }
    public static log(...content: string[]) {
        console.log(chalk.yellow("> ") + chalk.white(...content));
    }
}

class FileExistsError extends Error {
    constructor(message = "File already exists") {
        super(message);
        this.name = "FileExistsError";

        // Fix prototype chain (important for instanceof)
        Object.setPrototypeOf(this, new.target.prototype);
    }
}

type Config = {
    auto_title: boolean,
    components_dir: string,
    component_structure: Structure
}

interface DirectoryNode {
    name: string;
    nodeType: "dir";
    content: FsNode[];
}
interface FileNode {
    name: string;
    nodeType: "file";
    content: string;
}
type FsNode = DirectoryNode | FileNode;
type Structure = FsNode[];

function createFile(name:string, at: string, content: string) {
    const fpath = path.join(at, name);
    if (fs.existsSync(fpath)) {
        throw new FileExistsError(`A file/folder already exists at ${chalk.blue(fpath)}`)
    }

    fs.writeFileSync(fpath, content, { encoding: "utf-8", mode: "w" });
}

function createDirectory(name: string, at: string, children: FsNode[]) {
    const currPath: string = path.join(at, name);


    fs.mkdirSync(currPath);

    for (const node of children) {
        switch (node.nodeType) {
            case "dir":
                createDirectory(node.name, currPath, node.content);
                break;
            case "file":
                createFile(node.name, currPath, node.content);
            break;
        }
    }
}

function createComponent(componentName: string, root: string, structure: FsNode[]) {
    createDirectory(componentName, root, []);

    for (const node of structure) {
        switch (node.nodeType) {
            case "dir":
                break;
            case "file":
                break;
            default:
                throw TypeError(`Invalid FsNode type ${node}`);
        }
    }
}


function main() {
    let componentName = readline.question("Name of component to generate: ");
    if (componentName.length === 0) {
        Logger.error("Component name cannot be blank!");
        process.exit();
    }

    if (componentName.includes(" ")) {
        Logger.error("Component name cannot contain space!");
        process.exit();
    }

    if (config.auto_title) {
        componentName =
            componentName.charAt(0).toUpperCase() + componentName.slice(1);
    }
    Logger.log("Creating a component with name ", chalk.blue(componentName));

    const componentDir = path.join(
        process.cwd(),
        config.components_dir,
        componentName,
    );

    // henceforth the presence of any subfolder/subfile
    // wont be checked since the root folder is created here
    if (fs.existsSync(componentDir)) {
        Logger.error(
            "A component with the name ",
            chalk.blue(componentName),
            " already exists. (path: ",
            chalk.blue(componentDir),
            " )",
        );
        process.exit();
    }

    createComponent(componentName, config.components_dir, config.component_structure);
}
main();
