const path = require('path')
const TsConfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

module.exports = {
  context: __dirname,
  mode: 'production',
  entry: './src/index.ts',
  devtool: 'source-map',
  resolve: {
    extensions: ['.mjs', '.json', '.ts'],
    symlinks: false,
    plugins: [new TsConfigPathsPlugin()]
  },
  output: {
    libraryTarget: 'commonjs',
    path: path.join(__dirname, '.dist'),
    filename: 'index.js'
  },
  target: 'node',
  module: {
    rules: [
      {
        test: /\.(tsx?)$/,
        loader: 'ts-loader',
        include: path.resolve(__dirname, 'src'),
        options: {
          transpileOnly: true,
          happyPackMode: true
        }
      }
    ]
  }
}
