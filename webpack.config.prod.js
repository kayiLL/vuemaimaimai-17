const HtmlWebpackPlugin = require('html-webpack-plugin')

const webpack = require('webpack')

const VueLoaderPlugin = require('vue-loader/lib/plugin')

const path = require('path')

const CleanWebpackPlugin = require('clean-webpack-plugin')

const ExtractTextPlugin = require("extract-text-webpack-plugin");




module.exports = {
    // entry:'./src/main.js', //入口
    entry:{
        axios:['axios'],
        jquery:["jquery"],
        moment:['moment'],
        "v-distpicker":["v-distpicker"],
        "vue-lazyload":["vue-lazyload"],
        quanjiatong:["vue","vue-router","vuex"],
        bundle:'./src/main.js'
    },
    output:{ // 出口
        path:path.join(__dirname,'dist'),
        filename:'js/[name].js'
    },
    module:{
        rules:[
            {
                test:/\.vue$/,
                use:'vue-loader'
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: {
                        loader:'css-loader',
                        options:{
                            minimize: true, //在抽取css的时候同时进行压缩
                            publicPath:'dist/css'
                        }
                    }
                })
            },
            {
                test: /\.(ttf|woff|svg|eot|jpg|png|gif)$/,
                use: [
                  {
                    loader: "url-loader",
                    options: {
                      limit: 10000, //阀值,如果大于10KB就从bundle.js中抽出来，反之不抽
                      //这个阀值，不是写死的，是根据你们公司的实际来定的
                      name:'/statics/img/[name]-[hash:8].[ext]'
                    }
                  }
                ]
              },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: file => (
                  /node_modules/.test(file) &&
                  !/\.vue\.js/.test(file)
                )
              }
        ]
    },
    resolve: {
        extensions: [".vue", ".js", ".json"]
    },
    plugins:[
        // 自动删除dist文件夹
        new CleanWebpackPlugin("dist"),

        // 提取css文件
        new ExtractTextPlugin("styles.css"),

        new HtmlWebpackPlugin({
            template:'./template.html', //模版，指定参考文件
            minify:{
                removeComments:true, //删除注释
                minifyCSS:true,//压缩css
                minifyJS:true,//压缩js
                collapseWhitespace:true//压缩空格
              }
        }),
        // 全局的导入jquery
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
        new VueLoaderPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
              NODE_ENV: JSON.stringify('production')
            }
          }),
          new webpack.optimize.UglifyJsPlugin({
            compress: {
              warnings: false,
              drop_debugger: true, //去除调试
              drop_console: true  //去除console
            },
            output: {
                comments: false //去除copyright
              }
          }),
        //   抽离第三方包的,这里不要写bundle.js
        new webpack.optimize.CommonsChunkPlugin({
            name: [
              "quanjiatong",
              "vue-lazyload",
              "v-distpicker",
              "moment",
              "jquery",
              "axios"
            ],
            // name: ['jquery', 'vue-moment','quanjiatong','axios','v-distpicker','vue-lazyload'],
            // filename: "vendor.js"
            // (给 chunk 一个不同的名字)
      
            minChunks: Infinity
            // (随着 entry chunk 越来越多，
            // 这个配置保证没其它的模块会打包进 vendor chunk)
          }),

        //只保留moment中的简体中文
        new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn/)
    ]
}