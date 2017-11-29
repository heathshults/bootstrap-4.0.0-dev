'use strict'

module.exports = {
  'rules': {
    'at-rule-no-unknown': false,
    'block-no-empty': true,
    'color-no-invalid-hex': true,
    'comment-no-empty': false,
    'declaration-block-no-duplicate-properties': [true, {
      'ignore': ['consecutive-duplicates-with-different-values']
    }],
    'at-rule-empty-line-before': [
      'always',
      {
        'ignoreAtRules': ['else', 'error', 'import', 'include', 'extend']
      }
    ],
    'block-closing-brace-newline-after': [
      'always',
      {
        'ignoreAtRules': ['if', 'else']
      }
    ],
    'scss/dollar-variable-colon-space-before': 'never',
    'scss/dollar-variable-colon-space-after': 'always',
    'scss/double-slash-comment-whitespace-inside': 'always',
    'scss/dollar-variable-pattern': '^[a-z]+([a-z0-9-]+[a-z0-9]+)?$',
    'scss/percent-placeholder-pattern': '^[a-z]+([a-z0-9-]+[a-z0-9]+)?$',
    'scss/at-else-closing-brace-newline-after': 'always-last-in-chain',
    'scss/at-else-closing-brace-space-after': 'always-intermediate',
    'scss/at-else-empty-line-before': 'never',
    'scss/at-if-closing-brace-newline-after': 'always-last-in-chain',
    'scss/at-if-closing-brace-space-after': 'always-intermediate'

  }
}
