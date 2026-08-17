import { defineConfig, globalIgnores } from 'eslint/config';
import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import nextTypeScript from 'eslint-config-next/typescript';

export default defineConfig([
  ...nextCoreWebVitals,
  ...nextTypeScript,
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts']),
  {
    rules: {
      // Existing data-fetching and navigation effects are safe but predate this
      // React Hooks rule, so keep them visible without blocking the lint check.
      'react-hooks/set-state-in-effect': 'warn',
    },
  },
]);
