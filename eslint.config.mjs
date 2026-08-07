import nextConfig from "eslint-config-next";

const config = [
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "coverage/**",
      "next-env.d.ts",
      ".agents/**",
      ".claude/**",
      "guides/**",
      "public/**",
    ],
  },
  ...nextConfig,
];

export default config;
