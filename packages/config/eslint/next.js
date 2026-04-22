import { FlatCompat } from "@eslint/eslintrc";
import react from "./react.js";

const compat = new FlatCompat();

export default [
  ...react,
  ...compat.extends("next/core-web-vitals"),
];
