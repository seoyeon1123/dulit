import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends(
    'next/core-web-vitals',
    'next/typescript',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended'
  ),
  {
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', 'react-hooks'],
    rules: {
      'react/react-in-jsx-scope': 'off',
      'no-var': 'error',
      'no-multiple-empty-lines': 'error',
      'no-unused-vars': 'off',
      'no-console': 'warn',
      '@typescript-eslint/no-unused-vars': 'error',
      'react-hooks/exhaustive-deps': 'off',
      'react/jsx-uses-react': 'off',
      'react/jsx-uses-vars': 'error',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },
];

export default eslintConfig;
