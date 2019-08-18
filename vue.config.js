const path = require('path')

module.exports = {
  pages: {
    index: {
      entry: path.resolve(__dirname, 'src/client/main.js'),
    },
  },
  outputDir: path.resolve(__dirname, 'public/dist'),
  publicPath: path.resolve(__dirname, 'dist/'),
  devServer: {
    proxy: 'http://localhost:8000',
  },
  configureWebpack: {
    resolve: {
      modules: ['node_modules', 'src'],
    },
  },
}
