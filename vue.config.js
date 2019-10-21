const path = require('path')
module.exports = {
  outputDir: 'www',
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
