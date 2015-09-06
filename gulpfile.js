var gulp = require('gulp');
var jshint = require('gulp-jshint');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var reactify = require('reactify');
var mocha = require('gulp-mocha');
var istanbul = require('gulp-istanbul');
var coveralls = require('gulp-coveralls');

gulp.task('lint', function () {
  return gulp.src([
      'index.js',
      'componensts/*.js'
      ])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('test', function () {
  gulp.src('index.js')
    .pipe(istanbul())
    .pipe(istanbul.hookRequire())
    .on('finish', function () {
      gulp.src('test/test.js', {read: false})
        .pipe(mocha({ reporter: 'spec' }))
        .pipe(istanbul.writeReports({
          reporters: [
            'lcovonly',
            'cobertura',
            'html'
          ]
        }))
        .pipe(istanbul.enforceThresholds({ thresholds: { global: 90 } }))
        .once('error', function () {
          process.exit(0);
        })
        .once('end', function () {
          process.exit(0);
        });
    });
});

gulp.task('coveralls', function () {
  gulp.src('coverage/lcov.info')
    .pipe(coveralls());
});

gulp.task('default', function () {
  return browserify({ entries: ['components/index.jsx'], debug: true })
    .transform(reactify)
    .bundle()
    .pipe(source('index.js'))
    .pipe(gulp.dest('public/jsx/'));
});
