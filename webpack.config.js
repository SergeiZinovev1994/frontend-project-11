// // Generated using webpack-cli https://github.com/webpack/webpack-cli

// import HtmlWebpackPlugin from 'html-webpack-plugin';

// const config = {
//     mode: process.env.NODE_ENV || 'development',
//     entry: './src/index.js',// определяет файл или файлы, с которых Webpack начнёт сборку проекта (по умолчанию - ./src/index.js, если не указать)
//     output: {/*определяет выходные параметры:
//                     output.path - Определяет папку, куда Webpack сохранит сгенерированные файлы (по умолчанию - корень проекта)
//                     output.filename - Определяет имя генерируемого бандла (по умолчанию - main.js)*/
//         clean: true, // Очищает папку(output.path) перед сборкой или же очистит все файлы, которые он считает частью сборки.
//     },
//     devServer: {//запускает сервер, предоставляя автоматическое обновление страницы при изменении кода
//         open: true,
//         host: 'localhost',
//     },
//     plugins: [
//         new HtmlWebpackPlugin({
//             template: 'index.html',
//         }),

//         // Add your plugins here
//         // Learn more about plugins from https://webpack.js.org/configuration/plugins/
//     ],
//     module: {
//         rules: [
//             {
//                 test: /\.js$/,
//                 exclude: /node_modules/,
//                 use: {
//                     loader: 'babel-loader',
//                     options: {
//                         presets: ['@babel/preset-env'],
//                     },
//                 },
//             },
//             {
//                 test: /\.html$/i,
//                 use: ['html-loader'],
//                 exclude: /node_modules/,
//             },
//             {
//                 test: /\.css$/i,
//                 exclude: /node_modules/,
//                 use: ['style-loader', 'css-loader', 'postcss-loader'],
//             },
//             {
//                 test: /\.scss$/,
//                 exclude: /node_modules/,
//                 use: ['style-loader', 'css-loader', 'sass-loader', 'postcss-loader'],
//             },
//             {
//                 test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
//                 exclude: /node_modules/,
//                 // use: 'url-loader?limit=10000',
//             },
//             {
//                 test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
//                 exclude: /node_modules/,
//                 // use: 'file-loader',
//             },

//             // Add your rules for custom modules here
//             // Learn more about loaders from https://webpack.js.org/loaders/
//         ],
//     },
// };

// export default config;

// webpack.config.js




import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const config = {
mode: process.env.NODE_ENV || 'development',

entry: './src/index.js',

output: {
path: path.resolve('dist'),
filename: '[name].[contenthash].js',
clean: true,
},

cache: {
type: 'filesystem', // ускоряет повторные сборки
},

devServer: {
open: true,
host: 'localhost',
port: 3000,
hot: true,
compress: true,
client: {
overlay: true,
logging: 'warn',
},
},

plugins: [
new HtmlWebpackPlugin({
template: 'index.html',
}),
],

module: {
rules: [
{
test: /\.js$/,
include: path.resolve('src'),
exclude: /node_modules/,
use: {
loader: 'babel-loader',
options: {
presets: ['@babel/preset-env'],
cacheDirectory: true, // кешируем компиляцию babel
},
},
},
{
test: /\.html$/i,
include: path.resolve('src'),
use: ['html-loader'],
},
{
test: /\.css$/i,
include: path.resolve('src'),
use: ['style-loader', 'css-loader'],
},
{
test: /\.scss$/,
include: path.resolve('src'),
use: ['style-loader', 'css-loader', 'sass-loader'],
},
{
test: /\.(woff2?|ttf|eot|svg)$/,
type: 'asset/resource',
include: path.resolve('src'),
},
],
},
};

export default config;