module.exports = {
  parser: "@typescript-eslint/parser",
  extends: ["plugin:@typescript-eslint/recommended", "plugin:react-app/recommended"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  ignorePatterns: ["node_modules", "build"],
  rules: {
    "@typescript-eslint/indent": ["warn", 2],
    "@typescript-eslint/interface-name-prefix": "off",
    "@typescript-eslint/camelcase": "off",
    "@typescript-eslint/no-empty-interface": "off",
    "@typescript-eslint/class-name-casing": "warn", // withTheme, etc
    "@typescript-eslint/explicit-function-return-type": "off", // just infer it...
    "@typescript-eslint/member-delimiter-style": "off",
    "jsx-a11y/alt-text": "off",
    "@typescript-eslint/prefer-interface": "off",
  },
}
