module.exports = {
  root: true,
  env: {
    node: true,
    es6: true
  },
  extends: [
    "plugin:vue/essential",
    "@vue/standard"
  ],
  parserOptions: {
    parser: "babel-eslint"
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    semi: ["error", "always", { omitLastInOneLineBlock: false }],
    quotes: ["error", "double"],
    "space-before-function-paren": [1, {
      "anonymous": "never",
      "named": "never",
      "asyncArrow": "always"
    }],
    //"prefer-destructuring": ["error", { "object": false, "array": false }]
    "lines-between-class-members": [0],
    "no-unneded-ternary": 0
  }
};
