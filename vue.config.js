const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true, // 保留原有配置
  // 新增下面的 chainWebpack 配置
  chainWebpack: (config) => {
    // 配置 PDF 文件的加载器
    config.module
      .rule('pdf')
      .test(/\.pdf$/)
      .use('file-loader')
      .loader('file-loader')
      .options({
        name: '[name].[hash:8].[ext]',
        outputPath: 'assets/'
      })
      .end();
  }
});