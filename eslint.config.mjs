import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({ baseDirectory: __dirname });

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  { ignores: [".next/**", "node_modules/**", "scripts/**", "design_handoff/**", "next-env.d.ts"] },
  // The share card is drawn by next/og, where <img> is the only option. Next's rule already skips this file
  // on Linux (Vercel) but not on Windows, so switch it off here rather than with a disable comment.
  { files: ["src/app/opengraph-image.tsx"], rules: { "@next/next/no-img-element": "off" } },
];

export default eslintConfig;
