module.exports = {
  root: true,
  extends: [
    require.resolve('@vercel/style-guide/eslint/browser'),
    require.resolve('@vercel/style-guide/eslint/typescript'),
  ],
  env: {
    node: true,
    jest: true,
  },
  parserOptions: {
    project: './tsconfig.json',
  },
  ignorePatterns: ['*.config.js', 'dist/'],
};
