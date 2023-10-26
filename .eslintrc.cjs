/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  'extends': [
    'plugin:prettier/recommended',
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  rules: {
    //log警告
    'no-console': [2, { allow: ['warn', 'error'] }],
    //禁止[]内使用空格
    'array-bracket-spacing': 2,
    //禁用var
    'no-var': 2,
    //
    'no-unused-vars': 'off',
    //禁用veval
    'no-eval': 2,
    //箭头函数前后空格
    'arrow-spacing': 2,
    'vue/no-v-model-argument': 0,
    //执行一致的间距
    'block-spacing': 2,
    //对象的键值保持一致的间距
    'key-spacing': 2,
    //为块执行一致的括号样式
    'brace-style': 2,
    //驼峰命名变量
    'vue/camelcase': 2,
    //component元素是否有is属性
    'vue/require-component-is': 0,
    //props是否有require属性
    'vue/require-default-prop': 0,
    //组件名是否多个单词驼峰
    'vue/multi-word-component-names': 0,
    //是否强制标签单独一行
    'vue/singleline-html-element-content-newline': 0,
    //组件名是否大写
    'vue/component-definition-name-casing': 0,
    //key 则应该被设置在 <template>
    'vue/no-v-for-template-key': 'off',
    //注释标签格式
    'vue/html-closing-bracket-newline': [
      2,
      {
        singleline: 'never',
        multiline: 'always'
      }
    ],
    //属性换行
    'vue/max-attributes-per-line': 0,
    //没有内嵌标签的标签强制自闭合
    'vue/html-self-closing': [
      2,
      {
        html: {
          void: 'always',
          normal: 'never',
          component: 'always'
        },
        svg: 'always',
        math: 'always'
      }
    ],
    //ts配置项文档typescript-eslint.io/rules/
    '@typescript-eslint/camelcase': 0,
    '@typescript-eslint/no-non-null-assertion': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/member-delimiter-style': [
      2,
      {
        multiline: {
          delimiter: 'none',
          requireLast: true
        },
        singleline: {
          delimiter: 'semi',
          requireLast: false
        }
      }
    ],
    '@typescript-eslint/no-unused-vars': [0, { args: 'none' }],
    '@typescript-eslint/interface-name-prefix': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/no-empty-function': 0,
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/no-use-before-define': 0,
    '@typescript-eslint/no-explicit-any': 0,
    'prettier/prettier': [
      'error',
      {
        //页面宽度
        printWidth: 120,
        //禁用分号
        semi: false,
        //使用单引号
        singleQuote: true,
        //禁用尾逗号
        trailingComma: 'none',
        //箭头函数只有一个参数是省略括号
        arrowParens: 'avoid',
        //使用默认的折行标准
        insertPragma: false,
        tabWidth: 2,
        useTabs: false,
        //结尾是\n\r
        endOfLine: 'auto',
        //vue组件script标签缩进
        vueIndentScriptAndStyle: true,
        overrides: [
          {
            files: '*.vue',
            options: {
              parser: 'vue',
              printWidth: 120
            }
          }
        ]
      }
    ]
  },
  parserOptions: {
    ecmaVersion: 'latest'
  }
}
