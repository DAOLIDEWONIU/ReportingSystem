'use strict';
global.rootPath = __dirname;
var path = require('path');
const
    webpack = require('webpack'),
    UglifyJsPlugin = webpack.optimize.UglifyJsPlugin,
    HotModuleReplacementPlugin = webpack.HotModuleReplacementPlugin,/**模块热替换(HMR)交换, 添加, 或者删除模块, 同时应用持续运行, 不需要页面刷新.*/
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    ExtractTextPlugin = require("extract-text-webpack-plugin"),/**测试发现高版本的 “extract-text-webpack-plugin” 一直错误 ，项目用 “@1.0.1” 版本*/
    CompressionPlugin = require("compression-webpack-plugin"),/**开启gzip预压缩*/
    autoprefixer = require('autoprefixer');/**自动添加css浏览器前缀*/

//判断当前运行环境是开发模式还是生产模式
const nodeEnv = process.env.NODE_ENV || 'development';
const isPro = nodeEnv === 'production';

console.log("当前运行环境：", isPro ? 'production' : 'development');

module.exports = {
    /**入口文件路径配置*/
    entry: {
        index: [`${rootPath}/src/index.js`],
        vendor: [
            'react',
            'react-dom',
            'react-router',
            'antd/lib/date-picker',
            'antd/lib/table',
            'antd/lib/input',
            'antd/lib/icon',
            'antd/lib/button',
            'antd/lib/dropdown',
            'antd/lib/select',
            'antd/lib/menu',
            'antd/lib/tooltip',
            'antd/lib/modal'
        ]
    },
    /**输出文件路径配置*/
    output: {
        path: `${rootPath}/dist/`,
        publicPath: '/dist/',
        filename: '[name].js',
        library: '',
        libraryTarget: "umd",
    }, 
    /**SourceMap配置*/
    // devtool: 'cheap-module-eval-source-map',
    // devtool: 'source-map',
    /**require引用路径配置*/
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    /**模块加载器配置*/
    module: {
        loaders: [
            /**script加载器*/
            {
                test: /\.js[x]?$/,
                loader: 'babel-loader',
                exclude: /(node_modules|bower_components)/,
                query: {
                    presets: ['react','es2015',"stage-1"],
                    "plugins":[
                        'transform-runtime',//替代'babel-polyfill',
                        ["import",{"libraryName":"antd","style":"css"}]
                    ]
                } 
            },
            // {
            //     test: /\.js[x]?$/,
            //     loader: 'babel',
            //     exclude: /(node_modules)/
            // },
            /**image加载器*/
            {
                test: /\.(png|jp[e]?g|gif)$/,
                loader: 'url?limit=10240&name=/images/[name].[hash:5].[ext]'
            },
            /**font加载器*/
            {
                test: /\.(woff[2]?|svg|eot|ttf|otf)$/,
                loader: 'url?limit=10240&name=assets/fonts/[name].[hash:5].[ext]'
            },
            /**css加载器*/
            // { test: /\.css$/, loader: "style!css" },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader!postcss-loader?'
            },
            /**分离css为单独文件*/
            {
                test: /\.scss/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader!postcss-loader!sass-loader!")
            }
        ]
    },
    postcss:[autoprefixer({browsers:['last 3 versions']})],
    /**插件配置*/
    plugins: [

        new webpack.optimize.OccurrenceOrderPlugin(),//打包过程中，最小化id值
        new ExtractTextPlugin("css/[name].css"),
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor'],
            filename:'vendor.js'
        }),
        /***压缩js*/
        new webpack.optimize.DedupePlugin(),//模块去重
        new UglifyJsPlugin({
            compress: {
                warnings: false
            },
            comments: false,
            except: ['$', 'exports', 'require']
        }),
        /**取消使用压缩插件浏览器警告提示*/
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production') //定义生产环境
            }
        }),
        /** 开启gzip预压缩**/
        // new CompressionPlugin({
        //     asset: "[path].gz[query]",
        //     algorithm: "gzip",
        //     test: /\.(js|html|css)$/,
        //     threshold: 10240,
        //     minRatio: 0.8
        // }), 
        /**编译html**/
        new HtmlWebpackPlugin({
            favicon:`${rootPath}/dist/images/favicon/favicon.ico`,
            filename:`${rootPath}/dist/index.html`,    //生成的html存放路径，相对于 path  `${rootPath}/src/html/index.html`
            template:`${rootPath}/src/index.html`,    //html模板路径
            inject:true,    //允许插件修改哪些内容，包括head与body
            hash:true,    //为静态资源生成hash值
            minify:{    //压缩HTML文件
                removeComments:true,    //移除HTML中的注释
                collapseWhitespace:true   //删除空白符与换行符
            },
            chunks: ['index','vendor']//为视图指定js和css，名字在entry中选一个或多个
        }),
        /**支持hmr*/
        new HotModuleReplacementPlugin()
    ],
};