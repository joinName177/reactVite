/**
 * ESLint 配置文件
 * 使用最规范的 React 规则
 */
module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:jsx-a11y/recommended',
    'prettier' // 必须放在最后，覆盖其他配置
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['react', 'react-hooks', '@typescript-eslint', 'jsx-a11y'],
  settings: {
    react: {
      version: 'detect'
    }
  },
  rules: {
    // React 相关规则
    'react/react-in-jsx-scope': 'off', // React 17+ 不需要导入 React
    'react/prop-types': 'off', // 使用 TypeScript，不需要 prop-types
    'react/display-name': 'off',
    'react/jsx-uses-react': 'off',
    'react/jsx-uses-vars': 'error',

    // JSX 格式规则
    'react/jsx-max-props-per-line': [
      'error',
      {
        maximum: {
          single: 5, // 单行最多5个属性（适合自闭合标签如 img）
          multi: 1 // 多行时每行1个属性
        }
      }
    ],
    'react/jsx-first-prop-new-line': ['error', 'never'], // 第一个属性不换行
    'react/jsx-closing-bracket-location': ['error', 'line-aligned'],
    'react/jsx-closing-tag-location': 'error',
    'react/jsx-indent-props': ['error', 2],
    'react/jsx-indent': ['error', 2],
    'react/jsx-wrap-multilines': [
      'error',
      {
        declaration: 'parens-new-line',
        assignment: 'parens-new-line',
        return: 'parens-new-line',
        arrow: 'parens-new-line',
        condition: 'parens-new-line',
        logical: 'parens-new-line',
        prop: 'parens-new-line'
      }
    ],

    // TypeScript 相关规则
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_'
      }
    ],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',

    // 通用规则
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'prefer-const': 'error',
    'no-var': 'error'
  }
}
