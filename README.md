# React + Tailwind v4 + Vite (Rolldown) Template

## Features

- React 19 & Compiler
- Vite + Rolldown
- Tailwind CSS v4 along with `prettier-plugin-tailwindcss` for automatic class sorting.
- Styling: SCSS files are processed with `postcss-scss` and are provided full type hinting in TypeScript via `vite-plugin-sass-dts`.
- Component Generator: CLI tool for rapid creation of React Components. See [Creating Component](#creating-component).
- Source (src) folder resolution via `@/*` alias.

read the _Example_ component for more explaination

## Commands

Run via `npm run <name>`

- `lint`: Lint project using eslint
- `generate`: Create a new React Component
- `delete`: Delete a React Component

Vite Centric

- `dev`: Runs vite dev server
- `build`: Builds for production
- `preview`: Preview production build

## Installation

1. Clone the repo

```bash
git clone https://github.com/d1vij/react-project-template

cd react-project-template
```

2. Install Dependencies

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

> [!NOTE]
> I would suggest using pnpm rather than npm for quicker package installations

## Creating Component

A new component can be created by running

```bash
npm run generate
```

Components can contain dashes in their names, but should not have any spaces.

By default components are created in the src/components directory, this can be modified by changing path in `scripts/addComponent.ts`

---

> [!NOTE]
> The template is _heavily_ opinionated :)
