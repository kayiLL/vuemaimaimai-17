const HtmlWebpackPlugin = require('html-webpack-plugin')

const webpack = require('webpack')

const VueLoaderPlugin = require('vue-loader/lib/plugin')



module.exports = {
    entry:'./src/main.js', //入口
    module:{
        rules:[
            {
                test:/\.vue$/,
                use:'vue-loader'
            },
            {
                test:/\.css$/,
                use:[ 'style-loader', 'css-loader' ]
            },
            {
                test: /\.(ttf|woff|svg|eot|jpg|png)$/,
                use: [
                    {
                        loader: 'url-loader'
                    }
                ]
            }
        ]
    },
    devServer: {
        overlay: true //如果有错误，在页面中弹出一个遮罩层，错误的提示显示在上面
    },
    resolve: {
        extensions: [".vue", ".js", ".json"]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:'./template.html' //模版，指定参考文件
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
        new VueLoaderPlugin()
    ]
}