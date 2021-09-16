module.exports = {
  root: true,
  extends: '@react-native-community',
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/no-unused-vars': 'warn',
        curly: ['error', 'multi-or-nest'],
      },
    },
  ],
};
