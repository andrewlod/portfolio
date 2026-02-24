import { Prism } from 'prism-react-renderer';

// Add PromQL language definition
(typeof global !== 'undefined' ? global : window).Prism = Prism;

Prism.languages.promql = {
  comment: /#.*/,
  string: {
    pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
    greedy: true,
  },
  'metric-name': {
    pattern: /\b[a-zA-Z_:][a-zA-Z0-9_:]*(?=\{|\[|\s|$)/,
    alias: 'function',
  },
  'label-key': {
    pattern: /\b[a-zA-Z_][a-zA-Z0-9_]*(?==)/,
    alias: 'property',
  },
  function: /\b(?:rate|increase|sum|avg|max|min|count|histogram_quantile|irate|delta|increase)\b/,
  keyword: /\b(?:by|without|on|ignoring|group_left|group_right|bool|offset)\b/,
  operator: /[+\-*/%^]|==|!=|<=|>=|<|>|and|or|unless/,
  number: /\b\d+(?:\.\d+)?(?:[eE][+-]?\d+)?\b/,
  punctuation: /[{}[\](),]/,
};