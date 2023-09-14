module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'eslint:recommended',
    'plugin:prettier/recommended',
    'standard-with-typescript',
  ],
  overrides: [],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', 'prettier'],
  rules: {
    'react/react-in-jsx-scope': 0,
    'prettier/prettier': 'error',
    'react/jsx-boolean-value': 1,
    'react/jsx-closing-bracket-location': 1,
    'react/jsx-curly-spacing': 1,
    'react/jsx-key': 1,
    'react/jsx-max-props-per-line': 0,
    'react/jsx-no-bind': 0,
    'react/jsx-no-duplicate-props': 1,
    'react/jsx-no-literals': 0,
    'react/jsx-no-undef': 1,
    'react/jsx-uses-react': 1,
    'react/jsx-uses-vars': 1,
    'react/no-danger': 1,
    'react/prop-types': 1,
    'react/require-extension': 1,
    'react/self-closing-comp': 1,
    '@typescript-eslint/ban-types': [
      'error',
      {
        types: {
          Bar: "Don't use Bar because it is unsafe",
          Person: {
            message: 'Person is too generic!',
            fixWith: 'Employee',
          },
          Function: false,
        },
        extendDefaults: true,
      },
    ],
  },
};
