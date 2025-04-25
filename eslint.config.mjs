// import { dirname } from "path";
// import { fileURLToPath } from "url";
// import { FlatCompat } from "@eslint/eslintrc";
// import typescriptPlugin from "@typescript-eslint/eslint-plugin";
// import typescriptParser from "@typescript-eslint/parser";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// const compat = new FlatCompat({
//   baseDirectory: __dirname,
// });

// const eslintConfig = [
//   ...compat.extends("next/core-web-vitals"),

//   {
//     ignores: ["node_modules", ".next", "dist"],
//   },

//   {
//     files: ["**/*.ts", "**/*.tsx"],
//     languageOptions: {
//       parser: typescriptParser,
//       parserOptions: {
//         ecmaVersion: "latest",
//         sourceType: "module",
//         ecmaFeatures: {
//           jsx: true,
//         },
//       },
//     },
//     plugins: {
//       "@typescript-eslint": typescriptPlugin,
//     },
//     rules: {
//       "quotes": ["error", "double", { "avoidEscape": true }],
//       "semi": ["error", "always"],
//       "@typescript-eslint/no-explicit-any": "warn",
//       "@next/next/no-img-element": "off",
//       "no-console": "warn",
//     },
//   },
// ];

// export default eslintConfig;
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import typescriptPlugin from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "eslint-config-prettier"),

  {
    ignores: ["node_modules", ".next", "dist"],
  },

  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      "@typescript-eslint": typescriptPlugin,
    },
    rules: {
      quotes: ["error", "double", { avoidEscape: true }],
      semi: ["error", "always"],
      "@typescript-eslint/no-explicit-any": "warn",
      "@next/next/no-img-element": "off",
      "no-console": "warn",
    },
  },
];

export default eslintConfig;
