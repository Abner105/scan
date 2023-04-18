const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer:{
    server: 'https',  // https下才能调试使用相机
  }
})
