const gulp = require('gulp'), // Подключаем Gulp
  plumber = require('gulp-plumber'), // Формирование вывод об ошибке не прерывая работу gulp
  postcss = require('gulp-postcss'), // Использование нескольких css плагинов в одном
  sass = require('gulp-sass'), // Подключаем Sass пакет
  mqpacker = require('css-mqpacker'), // Оптимизация медиа запросов
  csso = require('gulp-csso'), // Минификатор css
  scsslint = require('gulp-scss-lint'), // Проверка стилистики кода
  autoprefixer = require('autoprefixer'), // Проставлет вендорные префиксы в CSS для поддержки старых браузеров
  unprefix = require('postcss-unprefix'), // Убрать префиксы
  pug = require('gulp-pug'), // Подключение препроцессора pug
  remember = require('gulp-remember'),
  imagemin = require('gulp-imagemin'), // Сжатие изображение
  uglifyJS = require('gulp-uglify'), // Минимизация js
  babel = require('gulp-babel'), // Преобразование es6 в es5
  sourcemaps = require('gulp-sourcemaps'),
  clean = require('gulp-clean'), // Очистить сборочную директорию
  browserSync = require('browser-sync'); // Подключаем Browser Sync

// Dev tasks
gulp.task('pug', function () { // Создаем таск pug
  return gulp.src('app/templates/*.pug') // Берем источник
    .pipe(pug({pretty: true})) // Преобразование html для читабельности
    .pipe(gulp.dest('app')) // Выгружаем результата в папку app
    .pipe(browserSync.reload({stream: true})) // Обновляем html на странице при изменении
});

gulp.task('sass', function () { // Создаем таск sass
  return gulp.src('./app/scss/**/*.scss') // Берем источник
    .pipe(sass()) // Преобразуем sass в css посредством gulp-sass
    .pipe(postcss([unprefix(), autoprefixer(), mqpacker({ sort: true })])) // Поставить префиксы, перенести
    // медиа запросы в конец файла
    .pipe(gulp.dest('app/css')) // Выгружаем результата в папку app/css
    .pipe(browserSync.reload({stream: true})) // Обновляем CSS на странице при изменении
});

gulp.task('pictures-min', function () { // Минимизация изображений
  return gulp.src('app/pictures/**/*.*')
    .pipe(imagemin())
    .pipe(gulp.dest('app/img'))
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('js', function () { // Таск для преобразования ^es6 в es5 для браузера
  return gulp.src('app/js/*.js')
    .pipe(babel({presets: [["@babel/preset-env"]]})) // Преобразование ^es6 в es5 для браузера
    .pipe(gulp.dest('app/js/es5'))
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('browser-sync', function () { // Создаем таск browser-sync
  browserSync({ // Выполняем browserSync
    server: { // Определяем параметры сервера
      baseDir: 'app' // Директория для сервера - app
    },
    notify: false // Отключаем уведомления
  });
});

gulp.task('watch', function () {
  gulp.watch('app/scss/**/*.scss', gulp.parallel('sass')); // Наблюдение за sass файлами
  gulp.watch('app/templates/**/*', gulp.parallel('pug')); // Наблюдение за pug файлами
  gulp.watch('app/pictures/*.*', gulp.parallel('pictures-min')); // Наблюдение за файлами изображений
  gulp.watch('app/js/*.js', gulp.parallel('js')); // Наблюдение за js файлами
});

gulp.task('run', gulp.parallel('pug', 'sass', 'pictures-min', 'js', 'browser-sync', 'watch')); // Таск для
// запуска gulp

//Build tasks
gulp.task('clean', function () { // Таск для очистки сборочной директории
  return gulp.src('build/**/*.*') // Указать путь ко всем файлам в build и подпапках
    .pipe(clean()) // Очистка папки build и всех подпапок
});

gulp.task ('html', function () { // Таск для переноса всех html из app в build
  return gulp.src('app/*.html')
    .pipe(gulp.dest('build'))
});

gulp.task ('css', function () { // Таск для переноса всех css из app в build
  return gulp.src('app/css/**/*.css')
    .pipe(csso()) // Минимизация css
    .pipe(gulp.dest('build/css'))
});

gulp.task ('script', function () { // Таск для переноса всех js из app в build
  return gulp.src('app/js/es5/**/*.js')
    .pipe(uglifyJS()) // Минимизация js
    .pipe(gulp.dest('build/js'))
});

gulp.task ('images', function () {
  return gulp.src('app/img/*.*')
    .pipe(gulp.dest('build/img'))
});

gulp.task ('fonts', function () {
  return gulp.src('app/fonts/*.*')
    .pipe(gulp.dest('build/fonts'))
});

gulp.task ('build', gulp.parallel('clean', 'html', 'css', 'script', 'images', 'fonts'));
