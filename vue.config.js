const path = require('path')
module.exports = {
  publicPath: './', // 預設為/ 所有html下的js css 連結都會是/js/xx,在輸出到web server 路徑會有問題,需用./
  outputDir: 'www',
  assetsDir: '',
  devServer: {
    port: 1234,
    open: true
  },
  chainWebpack: config => {
    config.module
      .rule('yaml')
      .test(/\.ya?ml$/)
      .use('js-yaml-loader')
      .loader('js-yaml-loader')
      .end()
    config.resolve.alias
      .set('@@', path.resolve(__dirname)) // @@ 代替根目錄
  }
}
