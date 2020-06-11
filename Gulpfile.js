'use strict';
 
var gulp = require('gulp');
var scss = require('gulp-sass');
scss.compiler = require('node-sass');
const autoprefix = require('gulp-autoprefixer');
 
gulp.task('scss', function (cb) {
  gulp.src('./scss/style.scss')
    .pipe(scss({outputStyle: 'expanded'}))
    .on('error', scss.logError)
    .pipe(autoprefix())
    .pipe(gulp.dest('./css'));
    cb();
});
 
gulp.task('scss:watch', function (cb) {
  gulp.watch('./scss/**/*.scss', gulp.series('scss'));
  cb();
});