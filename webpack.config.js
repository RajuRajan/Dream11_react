const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin=require("mini-css-extract-plugin");


module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test:/\.js$/,
                exclude:/node_modules/,
                use:{
                    loader:"babel-loader"
                }
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader",
                        options: { minimize: true }
                    }

                ]
            },
          {
              test:/\.(png|svg|jpg|gif|jpeg)$/,
              use:[
                  'file-loader'
              ]
              
          },{
            test:/\.(scss|css)$/,
            use:[
               "style-loader",
               "css-loader",
               "sass-loader" 
            ]
        }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:"./src/index.html",
            filename:"./index.html"
        }),
        new MiniCssExtractPlugin({
            filename:"[name].css",
            chunkFilename:"[id].css"
        }) 
    ],
    devServer: {
        historyApiFallback: true,
        publicPath: '/'
    }
}