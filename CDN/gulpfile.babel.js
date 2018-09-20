'use strict';

const gulp = require('gulp');
// const gulp = 'gulp';
const browserSync = require('browser-sync');
const gulpLoadPlugins = require('gulp-load-plugins');
const babel = require('gulp-babel');
const fileInclude = require('gulp-file-include');

const $ = gulpLoadPlugins();
const reload = browserSync.reload;

const basePath = 'www/';
const distPath = 'dist/'; 

gulp.task('fileinclude', function() {
  gulp.src(basePath +'**/*.html')
    .pipe(fileInclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest(basePath));
});


gulp.task('lint', () => {
  gulp.src([basePath +'js/**/*.js'])
    .pipe($.eslint())
    .pipe($.eslint.format())
    .pipe($.if(!browserSync.active, $.eslint.failAfterError()))
});

gulp.task('scripts', () => {
  gulp.src([
    // basePath + 'js/libs/jquery.js',
    basePath +'js/main.js'
  ])
  .pipe($.sourcemaps.init())
  .pipe(babel({
      presets: ['es2015']
  }))
  .pipe($.sourcemaps.write())
  .pipe(gulp.dest('.tmp/scripts'))
  .pipe($.concat('main.js'))
  .pipe($.size({title: 'scripts'}))
  .pipe($.sourcemaps.write('.'))
  .pipe(gulp.dest(basePath +'js/build'))
  .pipe(gulp.dest('.tmp/scripts'));

});

gulp.task('default', ['scripts', 'fileinclude'], () => {
  browserSync({
    notify: false,
    logPrefix: 'WSK',
    scrollElementMapping: ['main', '.mdl-layout'],
    server: ['.tmp', basePath],
    port: 3000
  });

  gulp.watch([basePath +'**/*.html'], ['scripts', reload]);
  gulp.watch([basePath +'js/main.js'], ['scripts', reload]);
});

gulp.task('html', () => {
  return gulp.src(basePath +'**/*.html')
          .pipe($.if('*.html', $.htmlmin({
            removeComments: true,
            collapseWhitespace: true,
            collapseBooleanAttributes: true,
            removeAttributeQuotes: true,
            removeRedundantAttributes: true,
            removeEmptyAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true,
            removeOptionalTags: true
          })))
          .pipe($.if('*.html', $.size({title: 'html', showFiles: true})))
          .pipe(gulp.dest(distPath));
});


gulp.task('copy', () => {
  gulp.src([
    basePath + '*',
    '!'+ basePath +'/*.html'
  ], {
    dot: true
  }).pipe(gulp.dest(distPath))
    .pipe($.size({title: 'copy'}))
});

gulp.task('build', ['html'],() => {
  //Scripts
  gulp.src([
    basePath +'js/build/main.js'
  ])
  .pipe($.uglify())
  .pipe(gulp.dest(distPath +'js/build'));

});