const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require ('mini-css-extract-plugin');
const {CleanWebpackPlugin} = require ('clean-webpack-plugin');



module.exports = {

    mode : 'development',

    devtool : 'source-map',
    entry: {
        index : './src/index.js'
    },
    output :{
        path : path.resolve(__dirname,'dist'),
        filename : './js/[name].js'
    },

    module :{
        rules :[
            {
                test: /\.css$/i,
                use:[
                    // 'style-loader',
                    {
                        loader : MiniCssExtractPlugin.loader,
                    },
                    {
                        loader : 'css-loader',
                        options :{
                            url:true,
                            import : true,
                            sourceMap : false
                        }
                    }
                ]
            },
            {
                test: /\.(png||jpe?g||gif)$/i,
                loader : 'file-loader',
                options : {
                    filename: '[name].[ext]',
                    outputPath: 'images',
                    publicPath: './images'
                }
            },
            {
                test: /\.md$/i,
                use:[
                    'html-loader',
                    'markdown-loader'
                ]
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            filename : 'index.html',
            template : './template/index.html',
            title : 'webpack App'

        }),

        new CleanWebpackPlugin(),

        new MiniCssExtractPlugin({
            filename : './css/[name].css'
        })
    ],
    //
    devServer: {
        // 生成的虚拟目录路径
         contentBase: "./dist",
        // 自动开启浏览器
        open: true,
        // 端口
        port: 8081
    }
}