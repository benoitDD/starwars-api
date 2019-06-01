const plateforme = global.process.platform === 'linux' ? 'unix' : 'windows'

module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "globals": {
        "process": "readonly",
        "test": "readonly",
        "expect": "readonly",
        "describe": "readonly",
        "jest": "readonly",
        "__dirname": "readonly"
    },
    plugins: [
        'graphql'
    ],
    "rules": {
        "graphql/template-strings": ['error', {
            env: 'apollo',
        },
        {
            env: 'literal'
        }],
        "graphql/named-operations": ['error', {
        },
        {
            env: 'literal'
        }],
        "graphql/capitalized-type-name": ['warn', {
        },
        {
            env: 'literal'
        }],
        "indent": [
            "error",
            4
        ],
        "linebreak-style": [
            "error",
            plateforme
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "never"],
        "no-sync": "error",
        "array-bracket-spacing": ["error", "never"],
        "block-spacing": "error",
        "brace-style": ["error", "1tbs", { "allowSingleLine": true }],
        "camelcase": "error",
        "capitalized-comments": ["error"]
    }
};