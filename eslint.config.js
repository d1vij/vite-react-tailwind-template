import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import { defineConfig, globalIgnores } from "eslint/config";

import reactDOM from "eslint-plugin-react-dom";
import reactX from "eslint-plugin-react-x";

export default defineConfig([
    globalIgnores(["dist"]),

    {
        files: ["**/*.{ts,tsx}"],

        extends: [
            js.configs.recommended,
            tseslint.configs.recommendedTypeChecked,
            reactHooks.configs.flat.recommended,
            reactRefresh.configs.vite,
            reactDOM.configs.recommended,
            reactX.configs["recommended-typescript"],
        ],

        languageOptions: {
            parserOptions: {
                project: ["./tsconfig.json", "./tsconfig.app.json", "./tsconfig.node.json"],
                tsconfigRootDir: import.meta.dirname,
            },
            globals: globals.browser,
        },
    },
]);
