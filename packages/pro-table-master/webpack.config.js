const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  entry: {
    protable: './src/index.tsx',
    'protable.min': './src/index.tsx',
  },
  output: {
    filename: '[name].js',
    library: 'ProTable',
    libraryExport: 'default',
    path: path.resolve(__dirname, 'dist'),
    globalObject: 'this',
  },
  mode: 'production',
  resolve: {
    extensions: ['.ts', '.tsx', '.json', '.css', '.js', '.less'],
    // modules: ["node_modules"],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        include: /\.min\.js$/,
      }),
      new OptimizeCSSAssetsPlugin({
        include: /\.min\.js$/,
      }),
    ],
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif|svg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          },
        ],
      },
      {
        test: /\.jsx?$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/typescript', '@babel/env', '@babel/react'],
            plugins: [
              ['@babel/plugin-proposal-decorators', { legacy: true }],
              ['@babel/plugin-proposal-class-properties', { loose: true }],
              '@babel/proposal-object-rest-spread',
            ],
          },
        },
      },
      {
        test: /\.tsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/typescript',
              [
                '@babel/env',
                {
                  loose: true,
                  modules: false,
                },
              ],
              '@babel/react',
            ],
            plugins: [
              ['@babel/plugin-proposal-decorators', { legacy: true }],
              ['@babel/plugin-proposal-class-properties', { loose: true }],
              '@babel/proposal-object-rest-spread',
            ],
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader', // creates style nodes from JS strings
          },
          {
            loader: 'css-loader', // translates CSS into CommonJS
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: (resourcePath, context) =>
                `${path.relative(path.dirname(resourcePath), context)}/`,
            },
          },
          {
            loader: 'css-loader', // translates CSS into CommonJS
          },
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
    ],
  },
  externals: [
    {
      react: 'React',
      'react-dom': 'ReactDOM',
      antd: 'antd',
      // '@bmstravel/pro-layout': "@bmstravel/pro-layout",
      moment: 'moment',
    },
    /^antd/, 
    // /^@bmstravel\/pro-layout/
  ],
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],
};
