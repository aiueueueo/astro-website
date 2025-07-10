import js from '@eslint/js'
import typescript from '@typescript-eslint/eslint-plugin'
import typescriptParser from '@typescript-eslint/parser'
import astro from 'eslint-plugin-astro'

export default [
  js.configs.recommended,
  {
    files: ['**/*.{js,mjs,cjs,ts,tsx}'],
    plugins: {
      '@typescript-eslint': typescript,
    },
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: {
        console: 'readonly',
        fetch: 'readonly',
        Response: 'readonly',
        URL: 'readonly',
        location: 'readonly',
        self: 'readonly',
        caches: 'readonly',
      },
    },
    rules: {
      // 基本的なルール
      'no-console': 'off',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
      'no-var': 'error',
      'prefer-const': 'warn',
      
      // TypeScriptルール
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-inferrable-types': 'off',
      
      // コードスタイル（緩和）
      'indent': 'off',
      'quotes': 'off',
      'semi': 'off',
      'comma-dangle': 'off',
      'object-curly-spacing': 'off',
      'array-bracket-spacing': 'off',
      
      // その他
      'eqeqeq': 'warn',
      'curly': 'off',
      'brace-style': 'off',
    },
  },
  ...astro.configs.recommended,
]