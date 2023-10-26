// scss模块化
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: config => {
    config.module
      .rule('scss')
      .oneOf('scss-modules')
      .test(/\.module\.\w+$/)
      .use('vue-style-loader')
      .loader('vue-style-loader')
      .end()
      .use('css-loader')
      .loader('css-loader')
      .options({
        modules: {
          localIdentName: '[name]__[local]--[hash:base64:5]'
        }
      })
      .end()
      .use('sass-loader')
      .loader('sass-loader')
      .end()
      .end()
      .oneOf('normal-scss')
      .use('vue-style-loader')
      .loader('vue-style-loader')
      .end()
      .use('css-loader')
      .loader('css-loader')
      .end()
      .use('sass-loader')
      .loader('sass-loader')
      .end()
  }
})
