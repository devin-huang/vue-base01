const webpack = require('webpack')

module.exports = {
  lintOnSave: false,
  productionSourceMap: false,
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/', // 配置全部请求得根路径，如果需要另配API得路径需要DefinePlugin插件
  configureWebpack: config => {
    // 按需载入（项目使用第三方插件时自动引用,没使用则不引用）
    config.plugins.push(
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        _: 'lodash'
      })
    )
    if (process.env.NODE_ENV === 'production') {
      // ***** 生产环境禁止输出console（具体配置在babel.config.js）*****
      // mutate config for production...
      config.plugins.push(
        new webpack.DefinePlugin({
          'process.env.ROOT_API': JSON.stringify('http://localhost:4009/')
        })
      )
    } else {
      // mutate for development...
      config.plugins.push(
        new webpack.DefinePlugin({
          'process.env.ROOT_API': JSON.stringify('http://localhost:4009/')
        })
      )
    }
  },
  devServer: {
    // 用于后端与前端并非在同一域名开发时指定后端域名端口
    proxy: 'http://localhost:4009'
    // proxy: {
    //   '/api': {
    //     target: VUE_APP_BASE_API,
    //     ws: true,
    //     changeOrigin: true,
    //   }
    // }
  }
}
