module.exports = {
  root: true,
  plugins: ['@typescript-eslint', 'import', 'prettier'],
  extends: ["airbnb-typescript/base", "prettier", "plugin:@typescript-eslint/recommended", "plugin:import/typescript", "plugin:storybook/recommended"],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.eslint.json'
  }
};