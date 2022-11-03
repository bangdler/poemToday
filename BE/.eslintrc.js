module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
    amd: true,
  },
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  extends: [
    // eslint와 prettier가 충돌나는 부분 비활성화 ( eslint-config-prettier )
    'prettier',
    'eslint:recommended',
    'plugin:import/recommended',
  ],
  // 사용자 전역 변수를 추가
  // 각 전역 변수 키에 대해 해당 값을 동일하게 설정하고 변수의 덮어쓰기 여부를 설정
  // 아래 두 빌트인 객체는 eslint 가 인식하지 못하므로 사용하려면 아래처럼 등록해야함.
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  plugins: [
    // prettier 규칙을 eslint에 적용시키게 해줌 ( eslint-plugin-prettier )
    'prettier',

    // ES2015의 import/export 구문 지원 ( eslint-plugin-import )
    'import',
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
            pattern: '@/**',
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
};
