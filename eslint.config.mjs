import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

// Assign the result to a variable
const eslintConfig = compat.config({
  extends: [
    "next/core-web-vitals",
    "next/typescript",
    "plugin:testing-library/react",
    "plugin:jest-dom/recommended",
  ],
  parserOptions: {
    project: "./tsconfig.json",  // Ensure the correct path to tsconfig.json
    tsconfigRootDir: __dirname,  // Reference the correct root directory
  },
  rules: {
    "@typescript-eslint/no-unused-vars": [
      "error",
      { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
    ],
    "@typescript-eslint/consistent-type-imports": [
      "warn",
      { prefer: "type-imports", fixStyle: "separate-type-imports" },
    ],
    "@typescript-eslint/no-misused-promises": [
      "error",
      { checksVoidReturn: { attributes: false } },
    ],
    "@typescript-eslint/no-unnecessary-condition": [
      "error",
      { allowConstantLoopConditions: true },
    ],
    "@typescript-eslint/no-non-null-assertion": "error",
    "import/consistent-type-specifier-style": ["error", "prefer-top-level"],
  },
  overrides: [
    {
      files: ["components/ui/**/*.{ts,tsx}"],
      rules: {
        "import/consistent-type-specifier-style": "off",
        "@typescript-eslint/no-unused-vars": "off",
        "@typescript-eslint/no-empty-object-type": "off",
      },
    },
  ],
});

// Now export the variable
export default eslintConfig;
