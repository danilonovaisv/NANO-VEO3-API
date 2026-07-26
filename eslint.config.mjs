import nextConfig from "eslint-config-next";

const config = [
  {
    // Sem `ignores` global o ESLint varre `.agents/` e linta scripts de
    // terceiros (hooks .cjs, skills .ts) que não fazem parte do app.
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "coverage/**",
      "next-env.d.ts",
      // conteúdo de agentes/skills: código de terceiros, fora do app Next.js
      ".agents/**",
      ".claude/**",
      "guides/**",
    ],
  },
  ...nextConfig,
];

export default config;
