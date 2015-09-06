var gulp = require('gulp');
var jshint = require('gulp-jshint');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var reactify = require('reactify');

gulp.task('lint', function () {
  return gulp.src([
      'componensts/*.js'
      ])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('default', function () {
  return browserify({ entries: ['components/list.jsx'], debug: true })
    .transform(reactify)
    .bundle()
    .pipe(source('list.js'))
    .pipe(gulp.dest('public/jsx/'));
});
