/**
 * Each component resides in its own subfolder inside the `@/components` directory
 * and exposes a single default export. This enables direct imports such as:
 *
 *   import Example from "@components/Example";
 *
 * Component structure (one component per folder):
 * 1. `Component.tsx`              – Default export of the component
 * 2. `component.module.scss`      – Component-scoped styles
 * 3. `index.ts`                   – Re-exports the component and its public types
 * 4. `types.ts`                   – Type definitions used by the component
 * 5. `component.module.d.scss.ts`         – Auto-generated while the Vite dev server is running
 *
 * This pattern encapsulates each component’s implementation, styles, and typings,
 * preventing unintended coupling between components.
 *
 * Type-only imports:
 *   import type { ExampleProps } from "@components/Example";
 */

import styles from "./example.module.scss";
import type { ExampleProps } from "./types";

export default function Example({ label }: ExampleProps) {
    return (
        <h1
            className={
                // scss module completion provided by vite-plugin-sass-dts
                styles.example +
                " " +
                // Tailwind Classes
                "bg-blue-300 p-5 text-center text-3xl text-slate-600"
            }
        >
            This is an example component
            <br />
            {label}
        </h1>
    );
}
