module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    amd: true,
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  extends: [
    // eslint와 prettier가 충돌나는 부분 비활성화 ( eslint-config-prettier )
    'prettier',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:import/recommended',
  ],
  plugins: [
    // prettier 규칙을 eslint에 적용시키게 해줌 ( eslint-plugin-prettier )
    'prettier',

    // ES2015의 import/export 구문 지원 ( eslint-plugin-import )
    'import',

    // React관련 eslint 설정 지원 ( eslint-plugin-react )
    'react',
  ],
  rules: {
    // prettier 규칙을 어기면 error 발생
    'prettier/prettier': ['error'],
    'import/no-unresolved': ['off', { caseSensitive: false }],
    'no-console': 'error',
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', ['parent', 'sibling'], 'index'],
        pathGroups: [
          {
            pattern: 'react',
            group: 'builtin',
            position: 'before',
          },
          {
            pattern: '@/*',
            group: 'external',
            position: 'after',
          },
        ],
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
        'newlines-between': 'always',
      },
    ],
  },
  ignorePatterns: ['temp.js', 'node_modules/'],
  settings: {
    react: {
      version: 'detect',
    },
  },
};
