export default [
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
]