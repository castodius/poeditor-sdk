const path = require('path')
const TsConfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const nodeExternals = require('webpack-node-externals')
const Dotenv = require('dotenv-webpack')
const CopyPlugin = require('copy-webpack-plugin')

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
          configFile: 'tsconfig.build.json',
          compiler: 'ttypescript'
        }
      }
    ]
  },
  plugins: [
    new Dotenv(),
    new CopyPlugin({
      patterns: [
        {
          from: 'README.MD',
          to: '.'
        },
        {
          from: 'package.json',
          to: '.'
        }
      ]
    })
  ]
}
