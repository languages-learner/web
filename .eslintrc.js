module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: [
        'plugin:vue/vue3-essential',
        '@vue/typescript',
        '@vue/typescript/recommended',
    ],
    parserOptions: {
        ecmaVersion: 2020,
        parser: '@typescript-eslint/parser',
    },
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        indent: ['error', 4],
        'vue/html-indent': ['error', 4],
        'vue/attributes-order': ['error'],
        'vue/v-on-function-call': ['error', 'never'],
        'newline-before-return': 'error',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        'object-curly-spacing': ['error', 'always'],
        'quotes': ['error', 'single'],
        'prefer-destructuring': ['error', { 'object': true, 'array': false }],
        'semi': ['error', 'never'],
    },
}
