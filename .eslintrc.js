module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    settings: {
        react: {
            version: 'detect'
        },
        'import/resolver': {
            typescript: {
                alwaysTryTypes: true
            }
        }
    },
    extends: [
        'eslint:recommended',
        // 'plugin:react-hooks/recommended',
        'plugin:react/recommended',
        'plugin:react/jsx-runtime',
        'standard-with-typescript',
        // 'plugin:@typescript-eslint/eslint-recommended',
        'prettier'
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: {
            jsx: true
        },
        sourceType: 'module',
        project: ['tsconfig.json']
    },
    plugins: ['react', 'react-hooks', '@typescript-eslint', 'import'],
    rules: {
        'global-require': 0,
        '@typescript-eslint/no-unused-vars': [
            'error',
            {
                varsIgnorePattern: '^_',
                argsIgnorePattern: '^_',
                ignoreRestSiblings: true
            }
        ],
        'linebreak-style': [2, 'unix'],
        'no-console': [
            'error',
            {
                allow: ['warn', 'error', 'info', 'log']
            }
        ],
        'lines-between-class-members': [
            2,
            'always',
            {
                exceptAfterSingleLine: true
            }
        ],
        // 'no-use-before-define': [
        //     2,
        //     {
        //         functions: true,
        //         classes: true,
        //         variables: false
        //     }
        // ],
        'prefer-destructuring': [
            2,
            {
                array: false,
                object: true
            }
        ],
        'react/prefer-stateless-function': 0,
        'react/prop-types': 0,
        'react/jsx-filename-extension': [
            2,
            {
                extensions: ['.js', '.jsx', '.tsx', '.ts']
            }
        ],
        'jsx-a11y/accessible-emoji': 0,
        'react/jsx-props-no-spreading': 'off',
        'jsx-a11y/anchor-is-valid': 0,
        'jsx-a11y/click-events-have-key-events': 0,
        'no-param-reassign': 0,
        'no-shadow': 'off',
        'import/no-unresolved': 'off',
        // 'react-hooks/rules-of-hooks': 'error',
        // 'react-hooks/exhaustive-deps': 'warn',
        // '@typescript-eslint/array-type': ['error', { default: 'generic' }],
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/strict-boolean-expressions': 'off',
        '@typescript-eslint/restrict-template-expressions': 'off',
        '@typescript-eslint/consistent-type-definitions': 'off',
        '@typescript-eslint/consistent-type-assertions': 'off',
        '@typescript-eslint/prefer-reduce-type-parameter': 'off',
        // Note: you must disable the base rule as it can report incorrect errors
        'no-use-before-define': 'off',
        '@typescript-eslint/no-use-before-define': 'warn',
        '@typescript-eslint/array-type': 'off',
        'array-callback-return': 'off',
        '@typescript-eslint/prefer-optional-chain': 'off',
        '@typescript-eslint/consistent-indexed-object-style': 'warn',
        '@typescript-eslint/no-confusing-void-expression': 'warn',
        '@typescript-eslint/no-extraneous-class': [
            2,
            {
                allowEmpty: true,
                allowConstructorOnly: true,
                allowStaticOnly: true
            }
        ]
    }
};
