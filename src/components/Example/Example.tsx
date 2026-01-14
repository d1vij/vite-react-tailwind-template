/**
 * All components live in their own subfolder within @/components directory
 * and are the sole default export per sub-folder, this allows for direct import of
 * component as 'import Example from "@components/Example"'
 *
 * One component per folder within @/components directory
 * Each component folder has
 * 1. `Component.tsx` - which default exports the component
 * 2. `component.module.scss` - Styling file for that particular component
 * 3. `index.ts` - exports the component and its typings
 * 4. `types.ts` - contains the types requried by the component
 * 5. `example.module.d.scss.ts` - Auto generated when vite dev server is running and
 *
 * This setup encapsulates each component's declaration, styling and typings from other components
 * Imports are as
 * import Example from "@components/Example";
 * import type {ExampleProps} from "@components/Example";
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
                "p-5 text-3xl bg-blue-300 text-slate-600 text-center"
            }
        >
            This is an example component
            <br />
            {label}
        </h1>
    );
}
