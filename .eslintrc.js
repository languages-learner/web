module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: [
        'plugin:vue/vue3-essential',
        '@vue/typescript',
        '@vue/typescript/recommended',
        './auto-generated-imports/.eslintrc-auto-import.json',
    ],
    plugins: [
        'import',
        'import-newlines',
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
        'vue/v-on-function-call': ['error', 'never'],
        'newline-before-return': 'error',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        'object-curly-spacing': ['error', 'always'],
        'quotes': ['error', 'single'],
        'prefer-destructuring': ['error', { 'object': true, 'array': false }],
        'semi': ['error', 'never'],
        'sort-imports': ['error', {
            'ignoreDeclarationSort': true,
        }],
        'import/order': ['error', {
            'groups': [
                'index',
                'sibling',
                'parent',
                'internal',
                'external',
                'builtin',
                'object',
                'type',
            ],
        }],
        '@typescript-eslint/consistent-type-imports': ['error', {
            fixStyle: 'inline-type-imports',
        }],
        'import-newlines/enforce': ['error', {
            items: 2,
            'max-len': 1000,
            semi: true,
        }],

        'vue/attributes-order': ['error', {
            order: [
                'DEFINITION',
                'LIST_RENDERING',
                'CONDITIONALS',
                'RENDER_MODIFIERS',
                'GLOBAL',
                'UNIQUE',
                'TWO_WAY_BINDING',
                'OTHER_DIRECTIVES',
                'EVENTS',
                'OTHER_ATTR',
                'CONTENT',
            ],
        }],
        'vue/first-attribute-linebreak': ['error', {
            singleline: 'beside',
            multiline: 'below',
        }],
        'vue/max-attributes-per-line': ['error', {
            singleline: 1,
            multiline: 1,
        }],
        'comma-dangle': ['error', 'always-multiline'],
    },
}
