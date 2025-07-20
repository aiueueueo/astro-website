import typescriptEslint from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';

export default [
  // JavaScript/JSX ファイルの設定
  {
    files: ['**/*.{js,jsx,mjs,cjs}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        console: 'readonly',
        fetch: 'readonly',
        Response: 'readonly',
        URL: 'readonly',
        location: 'readonly',
        self: 'readonly',
        caches: 'readonly',
        document: 'readonly',
        window: 'readonly',
        navigator: 'readonly',
        HTMLElement: 'readonly',
        Event: 'readonly',
        addEventListener: 'readonly',
        removeEventListener: 'readonly',
      },
    },
    rules: {
      // 全てのルールを無効化
    },
  },
  
  // TypeScript ファイルの設定
  {
    files: ['**/*.{ts,tsx}'],
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
        document: 'readonly',
        window: 'readonly',
        navigator: 'readonly',
        HTMLElement: 'readonly',
        Event: 'readonly',
        addEventListener: 'readonly',
        removeEventListener: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': typescriptEslint,
    },
    rules: {
      // TypeScript ルールを無効化
    },
  },
]