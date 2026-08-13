// ESLint flat config. From Next 16, eslint-config-next ships flat config arrays
// directly, so the old FlatCompat bridge (and @eslint/eslintrc with it) is gone
// — these entry points are spread in as-is.
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypeScript from "eslint-config-next/typescript";

const eslintConfig = [
  ...nextCoreWebVitals,
  ...nextTypeScript,
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      ".claude/**",
      // Saved reference pages, not source. Already git-ignored; linting
      // someone else's minified bundle only ever reports their choices.
      "Design Reference/**",
      "next-env.d.ts",
    ],
  },
];

export default eslintConfig;
