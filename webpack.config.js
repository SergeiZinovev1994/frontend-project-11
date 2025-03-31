import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const config = {
  mode: process.env.NODE_ENV || 'development',

  entry: './src/index.js',// определяет файл или файлы, с которых Webpack начнёт сборку проекта (по умолчанию - ./src/index.js, если не указать)

  output: {/*определяет выходные параметры:
//                     output.path - Определяет папку, куда Webpack сохранит сгенерированные файлы (по умолчанию - корень проекта)
//                     output.filename - Определяет имя генерируемого бандла (по умолчанию - main.js)*/
    path: path.resolve('dist'),
    filename: '[name].[contenthash].js',
    clean: true,// Очищает папку(output.path) перед сборкой или же очистит все файлы, которые он считает частью сборки.
  },

  cache: {
    type: 'filesystem', // ускоряет повторные сборки
  },

  devServer: {
    open: true,// Автоматически открывает браузер после запуска сервера.
    host: 'localhost',
    port: 3000,
    hot: true,// Включает "горячую перезагрузку" (Hot Module Replacement), чтобы изменения кода применялись без перезагрузки страницы.
    compress: true,// Включает сжатие HTTP-ответов для повышения производительности.
    client: {
      overlay: true,// Показывает ошибки компиляции или runtime-ошибки прямо на странице в виде оверлея.
      logging: 'warn',// Настраивает уровень логирования клиента, отображая предупреждения (`warn`) в консоли.
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
        test: /\.js$/,// Проверяет файлы, расширение которых '.js'. Применяет загрузчик только к таким файлам.
        include: path.resolve('src'),// Указывает папку 'src', в которой будут обрабатываться файлы. Это ограничивает область применения загрузчика.
        exclude: /node_modules/,// Исключает файлы в папке 'node_modules', чтобы ускорить сборку и избежать конфликтов с готовыми библиотеками.
        use: {
          loader: 'babel-loader',// Использует Babel для преобразования JavaScript-кода в совместимый со старыми браузерами формат.
          options: {
            presets: ['@babel/preset-env'],// Указывает пресет для преобразования ES6+ синтаксиса в ES5 для совместимости с браузерами.
            cacheDirectory: true, // Включает кэширование компиляции Babel, что ускоряет повторные сборки, сохраняя результаты предыдущих.
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