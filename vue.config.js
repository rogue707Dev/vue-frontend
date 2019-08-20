module.exports = {
  outputDir: 'www',
  devServer: {
    port: 1234
  },
  chainWebpack: config => {
    config.module
      .rule('yaml')
      .test(/\.ya?ml$/)
      .use('js-yaml-loader')
      .loader('js-yaml-loader')
      .end()
  }
}
