const { defineConfig } = require('@vue/cli-service')

/**
 * 解决跨域问题
 * @type {{devServer: {proxy: {"/api": {changeOrigin: boolean, pathRewrite: {"^/api": string}, target: string}}, host: string, open: boolean}}}
 */

module.exports = defineConfig({
  publicPath: './',
  lintOnSave: true,
  configureWebpack: {
    // 关闭 webpack 的性能提示
    performance: {
      hints: false
    }
  },
  transpileDependencies: true,
  devServer: {
    host: 'localhost',
    open: true, // 是否自动打开浏览器
    port: 9094,
    proxy: {
      '/api': { // 匹配所有以 '/api'开头的请求路径
        target: 'http://vckxni.natappfree.cc', // 代理目标的基础路径
        changeOrigin: true, // 支持跨域
        pathRewrite: { // 重写路径: 去掉路径中开头的'/api'
          '^/api': ''
        }
      }
    }
  }
})
