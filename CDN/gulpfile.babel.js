"use strict";

const gulp = require("gulp");
const cleanCSS = require("gulp-clean-css");
const sass = require("gulp-sass");
const browserSync = require("browser-sync");
const babel = require("gulp-babel");
const $ = require("gulp-load-plugins")();
var sourcemaps = require("gulp-sourcemaps");
const basePath = "www/";
const distPath = "dist/";

//SASS
gulp.task("sass", () => {
  const AUTOPREFIXER_BROWSERS = [
    "ie >= 10",
    "ie_mob >= 10",
    "ff >= 30",
    "chrome >= 34",
    "safari >= 7",
    "opera >= 23",
    "ios >= 7",
    "android >= 4.4",
    "bb >= 10"
  ];

  return gulp
    .src([basePath + "sass/main.scss"])
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe($.autoprefixer(AUTOPREFIXER_BROWSERS))
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest(basePath + "css"));
});

// CSS DIST
gulp.task("css-dist", function() {
  return gulp.src([basePath + "css/**"]).pipe(gulp.dest(distPath + "css"));
});

// INCLUDES
gulp.task("includes", function() {
  return gulp.src("templates/includes/*.pug");
});


// JAVASCRIPT
gulp.task("javascript", () => {
  return gulp
    .src([basePath + "js/main.js"])
    .pipe(sourcemaps.init())
    .pipe(
      babel({
        presets: ["@babel/preset-env"]
      })
    )
    .pipe($.concat("main.js"))
    .pipe($.size({ title: "scripts" }))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest(basePath + "js/build"));
});

// JAVASCRIPT DIST
gulp.task("javascript-dist", () => {
  return gulp
    .src([basePath + "js/build/main.js"])
    .pipe(gulp.dest(distPath + "js/build"));
});

// FONTS
gulp.task("fonts", () => {
  return gulp.src("css/fonts/*.*").pipe(gulp.dest(basePath + "fonts"));
});

// IMAGES
gulp.task("images", function() {
  return gulp
    .src(basePath + "images/*")
    .pipe(
      $.cache(
        $.imagemin({
          progressive: true,
          interlaced: true
        })
      )
    )
    .pipe(gulp.dest(distPath + "images"))
    .pipe($.size({ title: "img" }));
});

// HTML TO DIST
gulp.task("html", function() {
  return gulp
    .src(basePath + "**/*.html")
    .pipe(
      $.if(
        "*.html",
        $.htmlmin({
          removeComments: true,
          collapseWhitespace: true,
          collapseBooleanAttributes: true,
          removeAttributeQuotes: true,
          removeRedundantAttributes: true,
          removeEmptyAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true,
          removeOptionalTags: true
        })
      )
    )
    .pipe(gulp.dest(distPath));
});

// WATCH
gulp.task(
  "default",
  gulp.series( "javascript", "fonts", function() {
    // default task code here
    browserSync({
      notify: true,
      server: "www"
    });
    gulp.watch([basePath + "sass/*.scss"], gulp.series("sass"));
    gulp.watch([basePath + "js/main.js"], gulp.series("javascript"));
    gulp.watch([basePath + "fonts/*/*.*"], gulp.series("fonts"));
    gulp.watch(basePath + "**/*.html").on("change", browserSync.reload);
    gulp.watch(basePath + "js/main.js").on("change", browserSync.reload);
    gulp.watch(basePath + "sass/*.scss").on("change", browserSync.reload);
  })
);

// BUILD
gulp.task(
  "build",
  gulp.series("html", "images", "javascript-dist"),
  () => {}
);
