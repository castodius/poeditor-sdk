const path = require('path')
const TsConfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const nodeExternals = require('webpack-node-externals')

module.exports = {
  context: __dirname,
  mode: 'production',
  entry: './src/index.ts',
  devtool: 'cheap-source-map',
  resolve: {
    extensions: ['.mjs', '.json', '.ts', 'js'],
    symlinks: false,
    plugins: [new TsConfigPathsPlugin()]
  },
  output: {
    libraryTarget: 'commonjs',
    path: path.join(__dirname, '.dist'),
    filename: 'index.js'
  },
  externals: [nodeExternals()],
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
