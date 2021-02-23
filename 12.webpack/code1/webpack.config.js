const path  =require('path')

//导出的入口
module.exports = {

    mode: 'development',
    entry: {
       hello: './src/index.js',
    },

    output: {
        filename: '[name].index.js',
        path: path.resolve(__dirname, 'dist')
    },

    module: {
        rules: [
            {
                test:/\.txt$/,
                use: 'raw-loader'
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                loader: "file-loader",
                options: {
                    name : '[name].[ext]',
                    outputPath: 'image',
                    publicPath:'../dist/image'
                }
            },
            // {
            //     test: /\.css$/i,
            //     loader: "css-loader",
            //     options: {
            //         url : true,
            //         import:true,
            //         sourceMap: false
            //     }
            // }

            {
                test: /\.css$/i,
                use:[
                    'style-loader',

                    {
                        loader: "css-loader",
                        options: {
                            url: true,
                            import : true,
                            sourceMap: false
                        }
                    }

                ]
            }
        ]
    }
}