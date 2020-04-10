module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    'airbnb-typescript'
  ],
  rules: {
    "no-plusplus": [2, { allowForLoopAfterthoughts: true }],
    "react/destructuring-assignment": [2, "never", { ignoreClassFields: true }],
    "import/prefer-default-export": 0,
    "import/order": 2,
  },
};
