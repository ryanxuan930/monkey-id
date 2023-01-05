const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  publicPath: '/monkeyid',
  outputDir: 'index',
  assetsDir: 'static',
  transpileDependencies: true,
});
