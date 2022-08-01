module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["plugin:vue/vue3-essential", "airbnb-base", "prettier"],
  parserOptions: {
    ecmaVersion: "latest",
    parser: "@typescript-eslint/parser",
    sourceType: "module",
  },
  plugins: ["vue", "@typescript-eslint"],
  rules: {
    "no-param-reassign": [
      "error",
      {
        props: true,
        ignorePropertyModificationsFor: ["state"],
      },
    ],
    "import/prefer-default-export": 0,
    "import/no-extraneous-dependencies": 0,
    "no-console": ["error", { allow: ["warn", "error"] }],
    "import/no-unresolved": 0,
    "import/extensions": 0,
    "no-shadow": 0,
    "consistent-return": 0,
    "no-underscore-dangle": 0,
    "prefer-promise-reject-errors": 0,
    "no-restricted-syntax": [
      "error",
      {
        selector: "ForInStatement",
        message:
          "for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.",
      },
      {
        selector: "LabeledStatement",
        message:
          "Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.",
      },
      {
        selector: "WithStatement",
        message:
          "`with` is disallowed in strict mode because it makes code impossible to predict and optimize.",
      },
    ],
  },
  ignorePatterns: ["dist/", ".nuxt/", "scripts/"],
};
