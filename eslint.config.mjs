import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import unusedImports from "eslint-plugin-unused-imports";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,

  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),

  {
    plugins: {
      "unused-imports": unusedImports,
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      // ── Import sorting ──
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            // Side effect imports
            ["^\\u0000"],
            // React / Next.js
            ["^react$", "^react-dom$", "^next", "^@?\\w"],
            // Internal aliases
            ["^@/"],
            ["^lib"],
            ["^modules(/.*|$)"],
            // Parent & relative imports
            ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
            ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
            // Styles
            ["^.+\\.s?css$"],
          ],
        },
      ],
      "simple-import-sort/exports": "error",
      // Disable import/order from next config to avoid conflict
      "import/order": "off",

      // ── Unused imports (auto-fixable) ──
      "@typescript-eslint/no-unused-vars": "off",
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],

      // ── Code style ──
      "arrow-body-style": ["error", "as-needed"],
      "no-console": "warn",
      "prefer-const": "error",
      "no-var": "error",
      "no-param-reassign": "off",
      "no-nested-ternary": "warn",

      // ── TypeScript ──
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-shadow": "off",
      "@typescript-eslint/naming-convention": [
        "warn",
        {
          selector: "variable",
          format: ["camelCase", "PascalCase", "UPPER_CASE"],
          leadingUnderscore: "allow",
        },
        {
          selector: "function",
          format: ["camelCase", "PascalCase"],
        },
        {
          selector: "typeAlias",
          format: ["PascalCase"],
          custom: {
            regex: "^[A-Z][a-zA-Z0-9]*Type$",
            match: true,
          },
        },
        {
          selector: "interface",
          format: ["PascalCase"],
          custom: {
            regex: "^I[A-Z][a-zA-Z0-9]*$",
            match: true,
          },
        },
        {
          selector: "enum",
          format: ["PascalCase"],
          custom: {
            regex: "^[A-Z][a-zA-Z0-9]*Enum$",
            match: true,
          },
        },
      ],

      // ── React ──
      "react/self-closing-comp": "error",
      "react/jsx-no-useless-fragment": "error",
      "react/jsx-boolean-value": ["error", "never"],
      "react/jsx-curly-brace-presence": [
        "error",
        { props: "never", children: "never" },
      ],
      "react/jsx-pascal-case": ["error", { allowAllCaps: true }],
      "react/jsx-key": "error",
      "react/no-array-index-key": "warn",
      "react/prop-types": "off",
      "react/no-unescaped-entities": "off",
      "react/jsx-props-no-spreading": "off",
      "react/require-default-props": "off",
      "react/destructuring-assignment": "off",

      // ── JSX a11y ──
      "jsx-a11y/click-events-have-key-events": "off",
      "jsx-a11y/no-static-element-interactions": "off",
      "jsx-a11y/no-noninteractive-element-interactions": "off",
      "jsx-a11y/label-has-associated-control": "off",
      "jsx-a11y/control-has-associated-label": "off",

      // ── Max line length ──
      "max-len": [
        "warn",
        {
          code: 180,
          ignoreStrings: true,
          ignoreTemplateLiterals: true,
          ignoreComments: true,
        },
      ],

      // ── Misc ──
      "no-plusplus": ["warn", { allowForLoopAfterthoughts: true }],
    },
  },
]);

export default eslintConfig;
