module.exports = {
  "env": {
    "commonjs": true,
    "es6": true,
    "node": true
  },
  "extends": ["eslint:recommended"],
  "parserOptions": {
    "ecmaVersion": 2018
  },
  "rules": {
    "one-var": ["error", "never"],
    "prefer-const": "error"
  }
};
