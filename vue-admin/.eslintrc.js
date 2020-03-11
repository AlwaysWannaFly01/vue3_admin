module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/essential", "eslint:recommended", "@vue/prettier"],
  parserOptions: {
    parser: "babel-eslint"
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    'prettier/prettier': [
        'error',
        {
          tabWidth: 4,
        //   useTabs: true,//是否使用tab进行缩进，默认为false，表示用空格进行缩减
        //   semi: false,//行位是否使用分号，默认为true
        //   singleQuote: true,//字符串是否使用单引号，默认为false，使用双引号
        //   trailingComma: 'none',//是否使用尾逗号，有三个可选值"<none|es5|all>"
        //   bracketSpacing: true,//对象大括号直接是否有空格，默认为true，效果：{ foo: bar }
        //   jsxBracketSameLine: true,
        //   arrowParens: 'always',
        //   printWidth: 200
        }
      ]
  }
};
