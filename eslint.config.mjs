import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettierConfig from "eslint-config-prettier";

const eslintConfig = defineConfig([
  // Configs de base Next.js + TypeScript
  ...nextVitals,
  ...nextTs,

  // Prettier en dernier pour désactiver les règles de style conflictuelles
  prettierConfig,

  // Fichiers à ignorer
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "prisma/seed.ts", // fichier de dev uniquement
  ]),

  // Règles custom
  {
    rules: {
      // React
      "react/no-unescaped-entities": "off", // apostrophes françaises sans &apos;

      // Console
      "no-console": ["warn", { allow: ["error", "warn"] }],

      // TypeScript
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/consistent-type-imports": ["warn", { prefer: "type-imports" }],
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
    },
  },
]);

export default eslintConfig;
