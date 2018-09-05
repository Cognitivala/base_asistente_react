'use strict';

const gulp          = require('gulp');
const pug           = require('gulp-pug');
const cleanCSS      = require('gulp-clean-css');
const sass          = require('gulp-sass');
const browserSync   = require('browser-sync');
const reload        = browserSync.reload;
const autoprefixer  = require('gulp-autoprefixer');
const $             = require('gulp-load-plugins')();
const es            = require('event-stream');
const basePath      = 'www/assets/';
const distPath = 'dist/';

// SASS
gulp.task('sass', function () {
 return gulp.src(['sass/**/*.scss', 'sass/*.scss'])
  // .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
  .pipe($.sass({
      style: 'expanded',
      precision: 10
    })
    .on('error', console.error.bind(console))
  ) 
    .pipe(gulp.dest(basePath + 'css'));
});

// SASS_DIST
gulp.task('sass-dist', function () {
  return gulp.src(['sass/**/*.scss', 'sass/*.scss'])
   // .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
   .pipe($.sass({
       style: 'expanded',
       precision: 10
     })
     .on('error', console.error.bind(console))
   ) 
     .pipe(gulp.dest('assets/css'));
 });


 // PUG
gulp.task('templates', function() {
  var locales = {};
  return gulp.src(['templates/*.pug','templates/**/*.pug','templates/**/**/*.pug','!templates/includes/**'])
  .pipe(
    $.pug({
      locals: locales,
      pretty: true
    })
  )
  .pipe(gulp.dest('www'));
});

// INCLUDES
gulp.task('includes', function() {
  return gulp.src('templates/includes/*.pug')
});

// JAVASCRIPT
gulp.task('javascript', () => {
  return gulp.src('assets/js/*.js')
  .pipe(gulp.dest(basePath+'js'));
});

// FONTS
gulp.task('fonts', () => {
  return gulp.src('assets/fonts/*.*')
  .pipe(gulp.dest(basePath+'fonts'));
});

// IMAGES
gulp.task('images', function () {
  var myAssets = gulp.src('assets/img/*')
    .pipe($.cache($.imagemin({
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest(basePath + 'img'))
    .pipe($.size({ title: 'img' }));
  
  var myFavicon = gulp.src('assets/img/favicon/*.*')
    .pipe($.cache($.imagemin({
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest(basePath + 'img/favicon'))
    .pipe($.size({ title: 'favicon' }));

  var myDist = gulp.src(basePath + 'img/*')
    .pipe($.cache($.imagemin({
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest(distPath + 'assets/img'))
    .pipe($.size({ title: 'img' }));
  
  var myFavDist = gulp.src('assets/img/favicon/*.*')
    .pipe($.cache($.imagemin({
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest(distPath + 'assets/img/favicon'))
    .pipe($.size({ title: 'favicon' }));
  
    return es.concat(myAssets, myDist, myFavicon, myFavDist);
});

// HTML TO DIST
gulp.task('html', function() {
  var locales = {};
  return gulp.src(['templates/*.pug','templates/**/*.pug','templates/**/**/*.pug','!templates/includes/**'])
  .pipe(
    $.pug({
      locals: locales,
      pretty: false
    })
  )
  .pipe(gulp.dest(distPath));
});

// WATCH
gulp.task('serve', ['sass', 'sass-dist', 'javascript', 'templates', 'images', 'fonts'], function() {
  browserSync({
    notify: true,
    server: "www"
  });
  gulp.watch(['**/*.pug', '**/**/*.pug'], ['templates', reload]);
  gulp.watch(['assets/fonts/*.*'], ['fonts', reload]);
  gulp.watch(['**/*.pug'], ['includes', reload]);
  gulp.watch([basePath +'**/*.html', basePath +'**/**/*.html'], reload);
  gulp.watch(['sass/**/*.scss', 'sass/*.scss'], ['sass', reload]);
  gulp.watch(['sass/**/*.scss', 'sass/*.scss'], ['sass-dist', reload]);
  gulp.watch(['assets/js/*.js'], ['javascript', reload]);
  gulp.watch(['assets/img/*.*', 'assets/img/*/*.*'], ['images', reload]);
});

// SERVER
gulp.task('default', ['serve']);

// BUILD
gulp.task('build', ['html', 'images'], () => {
  //Scripts
  gulp.src([
    'assets/js/*.js'
  ])
  .pipe(gulp.dest(distPath +'assets/js/'));

  //Styles
  gulp.src([
    'assets/css/*.css',
    'assets/css/**/*.css'
  ])
  .pipe(cleanCSS())
  .pipe(gulp.dest(distPath + 'assets/css/'));
  
  //FONTS
  gulp.src([
    'assets/fonts/*.*'
  ])
  .pipe(gulp.dest(distPath +'assets/fonts/'));
});