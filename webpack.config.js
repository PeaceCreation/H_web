const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require('path');

module.exports = {
  entry: './src/js/index.js',
  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'main.js',
  },

  module: {

    rules: [

    //   Sass
    {
        test: /\.(sass|css|scss)$/,
        use: [
          // Creates `style` nodes from JS strings
          MiniCssExtractPlugin.loader,
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
      // Files loader
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: './images/[name][ext]'
        }
      },

      // Fonts Loader 
      {
        test: /\.(eot|svg|woff|woff2|ttf)$/i,
        type: 'asset/resource',
        generator:{
            filename: "./fonts/[name][ext]",
        }
      },
      
      // html
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      // loader-Jquery
      {
        test: require.resolve("jquery"),
        loader: "expose-loader",
        options: {
          exposes: ["$", "jQuery"],
        },
      },
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'build'),
    },
    // compress: true,
    port: 9000,
      devMiddleware: {
        writeToDisk: true,
        stats: 'errors-only'
      
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
    template: './src/index.html',
    filename: 'index.html'
  }),
  new MiniCssExtractPlugin({
    filename: 'css/main.css'
  })

],
};