module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/typescript/recommended',
    '@vue/prettier',
  ],
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2020,
    project: 'tsconfig.eslint.json',
  },
  rules: {
    /*
     ** Javascript
     ** Docs: https://prettier.io/docs/en/options.html
     */
    'prettier/prettier': [
      'error',
      {
        semi: false,
        singleQuote: true,
        quoteProps: 'preserve',
        bracketSpacing: true,
        trailingComma: 'all',
        printWidth: 80,
      },
    ],
    /*
     ** Typescript
     ** Docs: https://www.npmjs.com/package/@typescript-eslint/eslint-plugin#supported-rules
     */
    '@typescript-eslint/await-thenable': 'error',
    '@typescript-eslint/consistent-type-imports': 'error',
    /*
     ** Javascript
     ** Docs: https://eslint.org/docs/rules/
     */
    // Import Sorting
    'sort-imports': [
      'error',
      {
        ignoreCase: true,
        ignoreDeclarationSort: true,
        ignoreMemberSort: false,
      },
    ],
    // enforce consistent indentation
    'indent': ['error', 2, { SwitchCase: 1 }],
    // enforce a maximum line length
    'max-len': ['error', { code: 100 }],
    // enforce the consistent use of either backticks, double, or single quotes
    'quotes': [
      'error',
      'single',
      {
        allowTemplateLiterals: true,
        avoidEscape: true,
      },
    ],
    // require or disallow semicolons  instead of ASI
    'semi': ['error', 'never'],
    // disallow the use of `console`
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // disallow the use of `debugger`
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // disallow empty block statements
    'no-empty': 'error',
    // disallow multiple spaces
    'no-multi-spaces': 'error',
    // enforce consistent spacing between keys and values in object literal
    // properties
    'key-spacing': [
      'error',
      {
        beforeColon: false,
        afterColon: true,
        mode: 'strict',
      },
    ],
    // enforce consistent spacing inside array brackets
    'array-bracket-spacing': ['error', 'never'],
    // enforce consistent spacing before and after the arrow in arrow functions
    'arrow-spacing': [
      'error',
      {
        before: true,
        after: true,
      },
    ],
    // enforce consistent brace style for blocks
    'brace-style': [
      'error',
      '1tbs',
      {
        allowSingleLine: true,
      },
    ],
    // require or disallow trailing  commas
    'comma-dangle': ['error', 'always-multiline'],
    // enforce consistent spacing before and after commas
    'comma-spacing': 'error',
    // disallow multiple empty lines
    'no-multiple-empty-lines': [
      'error',
      {
        maxBOF: 0,
        max: 1,
        maxEOF: 1,
      },
    ],
    // require or disallow padding within blocks
    'padded-blocks': [
      'error',
      {
        blocks: 'never',
        classes: 'always',
        switches: 'never',
      },
    ],
    // require or disallow padding lines between statements
    'padding-line-between-statements': [
      'error',
      {
        blankLine: 'always',
        prev: '*',
        next: 'return',
      },
      {
        blankLine: 'always',
        prev: ['const', 'let'],
        next: '*',
      },
      {
        blankLine: 'any',
        prev: ['const', 'let'],
        next: ['const', 'let'],
      },
      {
        blankLine: 'always',
        prev: '*',
        next: 'if',
      },
      {
        blankLine: 'always',
        prev: 'if',
        next: '*',
      },
      {
        blankLine: 'always',
        prev: 'directive',
        next: '*',
      },
      {
        blankLine: 'any',
        prev: 'directive',
        next: 'directive',
      },
      {
        blankLine: 'always',
        prev: 'export',
        next: '*',
      },
      {
        blankLine: 'always',
        prev: 'import',
        next: '*',
      },
      {
        blankLine: 'never',
        prev: 'import',
        next: 'import',
      },
    ],
    // require quotes around object literal property names
    'quote-props': ['error', 'consistent-as-needed'],
    // enforce consistent spacing before blocks
    'space-before-blocks': ['error', 'always'],
    // enforce consistent spacing inside parentheses
    'space-in-parens': ['error', 'never'],
    // enforce consistent spacing before and after keywords
    'keyword-spacing': [
      'error',
      {
        before: true,
      },
    ],
    // require spacing around infix operators
    'space-infix-ops': 'error',
    // enforce consistent spacing inside braces
    'object-curly-spacing': ['error', 'always'],
    // enforce consistent spacing before `function` definition opening parenthesis
    'space-before-function-paren': ['error', 'never'],
    /*
     ** VUE
     ** Docs: https://eslint.vuejs.org/rules/
     */
    // require or disallow padding lines between blocks
    'vue/padding-line-between-blocks': ['error', 'always'],
    'vue/multi-word-component-names': [
      'error',
      {
        ignores: ['Card'],
      },
    ],
  },
}
