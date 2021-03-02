const gulp = require('gulp'),
  plumber = require('gulp-plumber'),
  postcss = require('gulp-postcss'),
  sass = require('gulp-sass'),
  mqpacker = require('css-mqpacker'),
  csso = require('gulp-csso'),
  autoprefixer = require('autoprefixer'),
  unprefix = require('postcss-unprefix'),
  pug = require('gulp-pug'),
  remember = require('gulp-remember'),
  imagemin = require('gulp-imagemin'),
  uglifyJS = require('gulp-uglify'),
  babel = require('gulp-babel'),
  sourcemaps = require('gulp-sourcemaps'),
  concat = require('gulp-concat'),
  clean = require('gulp-clean'),
  browserSync = require('browser-sync');

// Dev tasks
gulp.task('pug', function () {
  return gulp.src('app/templates/*.pug')
    .pipe(pug({pretty: true}))
    .pipe(gulp.dest('app'))
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('sass', function () {
  return gulp.src('./app/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'expanded' }))
    .pipe(postcss([unprefix(), autoprefixer(), mqpacker({ sort: true })]))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('pictures-min', function () {
  return gulp.src('app/pictures/**/*.*')
    .pipe(imagemin())
    .pipe(gulp.dest('app/img'))
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('js', function () {
  return gulp.src(['app/script/slick.js', 'app/script/main.js'])
    .pipe(sourcemaps.init())
    .pipe(concat('main.js'))
    .pipe(babel({presets: [["@babel/preset-env"]]}))
    .pipe(gulp.dest('app/js'))
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('browser-sync', function () {
  browserSync({
    server: {
      baseDir: 'app'
    },
    notify: false
  });
});

gulp.task('watch', function () {
  gulp.watch('app/scss/**/*.scss', gulp.parallel('sass'));
  gulp.watch('app/templates/**/*', gulp.parallel('pug'));
  gulp.watch('app/pictures/*.*', gulp.parallel('pictures-min'));
  gulp.watch('app/script/*.js', gulp.parallel('js'));
});

gulp.task('compile', gulp.parallel('pug', 'sass', 'pictures-min', 'js'));

gulp.task('watch-changes', gulp.parallel('browser-sync', 'watch'));

gulp.task('default', gulp.series('compile', 'watch-changes'));

//Build tasks
gulp.task('clean', function () {
  return gulp.src('build/**/*.*')
    .pipe(clean())
});

gulp.task ('html', function () {
  return gulp.src('app/*.html')
    .pipe(gulp.dest('build'))
});

gulp.task ('css', function () {
  return gulp.src('app/css/**/*.css')
    .pipe(csso())
    .pipe(gulp.dest('build/css'))
});

gulp.task ('script', function () {
  return gulp.src('app/js/*.js')
    .pipe(uglifyJS())
    .pipe(gulp.dest('build/js/main.min.js'))
});

gulp.task ('images', function () {
  return gulp.src('app/img/*.*')
    .pipe(gulp.dest('build/img'))
});

gulp.task ('fonts', function () {
  return gulp.src('app/fonts/*.*')
    .pipe(gulp.dest('build/fonts'))
});

gulp.task ('build', gulp.series('clean', 'html', 'css', 'script', 'images', 'fonts'));
