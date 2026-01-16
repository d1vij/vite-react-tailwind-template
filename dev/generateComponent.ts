/**
 * Utility to quickly generate a new component
 */

import chalk from "chalk";
import process from "process";
import fs from "fs";
import path from "path";
import readline from "readline-sync";

import Logger from "./utils/Logger";

import { config } from "./globals";

function createContent(...lines: string[]): string {
    return lines.join("\n");
}

function generateComponentStructure(componentName: string): Structure {
    const indexContent = createContent(
        `export { default } from "./${componentName}"`,
        `export * from "./types"`,
    );

    const replacedName = componentName.replaceAll("-", "_");

    const typesContent = createContent(`export type ${replacedName}Props = {}`);
    const stylesheetContent = createContent(
        `.${replacedName.toLowerCase()} { /* not implemented */}`,
    );
    const componentFileContent = createContent(
        'import styles from "./styles"',
        `import type {${replacedName}Props} from "./types";`,
        "",
        `export default function ${replacedName}({  }: ${replacedName}Props){}`,
    );

    return [
        // index.ts
        { nodeType: "file", name: `index.ts`, content: indexContent },
        // component file
        { nodeType: "file", name: `${componentName}.tsx`, content: componentFileContent },
        // stylesheet
        {
            nodeType: "file",
            name: `${componentName.toLowerCase()}.module.scss`,
            content: stylesheetContent,
        },
        // types.ts
        { nodeType: "file", name: `types.ts`, content: typesContent },
    ];
}

class FileExistsError extends Error {
    constructor(message = "File already exists") {
        super(message);
        this.name = "FileExistsError";

        // Fix prototype chain (important for instanceof)
        Object.setPrototypeOf(this, new.target.prototype);
    }
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

function createFile(name: string, at: string, content: string) {
    const fpath = path.join(at, name);
    Logger.debug("Creating file at ", fpath);
    if (fs.existsSync(fpath)) {
        throw new FileExistsError(`A file/folder already exists at ${chalk.blue(fpath)}`);
    }

    fs.writeFileSync(fpath, content, { encoding: "utf-8", flag: "w" });
}

function createDirectory(name: string, at: string, children: FsNode[]) {
    const currPath: string = path.join(at, name);
    Logger.debug("Creating directory at ", currPath);

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

function createComponent(componentName: string, componentRoot: string) {
    createDirectory(componentName, componentRoot, []);

    const structure = generateComponentStructure(componentName);
    Logger.debug(JSON.stringify(structure, null, 4));

    const componentDir = path.join(componentRoot, componentName);

    for (const node of structure) {
        switch (node.nodeType) {
            case "dir":
                createDirectory(node.name, componentDir, node.content);
                break;
            case "file":
                createFile(node.name, componentDir, node.content);
                break;
            default:
                // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                throw TypeError(`Invalid FsNode type ${node}`);
        }
    }
}

function main() {
    let componentName = readline.question("Name of component to generate: ").trim();
    if (componentName.length === 0) {
        Logger.error("Component name cannot be blank!");
        process.exit()
    }

    if (componentName.includes(" ")) {
        Logger.error("Component name cannot contain space!");
        process.exit();
    }

    if (config.auto_title) {
        componentName = componentName.charAt(0).toUpperCase() + componentName.slice(1);
    }
    Logger.log("Creating a component with name ", chalk.blue(componentName));

    const componentDir = path.join(process.cwd(), config.components_dir, componentName);

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

    createComponent(componentName, config.components_dir);
}
main();
