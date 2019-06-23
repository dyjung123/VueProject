module.exports = {
    configureWebpack: {
      devtool: 'source-map'
    },
    devServer: {
      proxy: {
          '/analysis': {
              target: 'http://localhost:3003'
          }
      }
  }
}