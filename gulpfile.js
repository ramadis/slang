var gulp = require('gulp');
var runSequence = require('run-sequence');
var babel = require('gulp-babel');
var del = require('del');
var mocha = require('gulp-mocha');
var concat = require('gulp-concat');

gulp.task('default', function(cb) {
  runSequence('clean', ['source', 'test'], 'run-tests', cb);
});

var path = {
  dist: 'dist',
  src: 'src/**/*.js',
  test: 'test/*.js',
  srcFile: 'all.js',
  testFile: 'tests.js'
}

gulp.task('source', function () {
  return gulp.src(path.src)
    .pipe(concat(path.srcFile))
    .pipe(babel({
        presets: ['es2015']
    }))
    .pipe(gulp.dest(path.dist));
});

gulp.task('test', function () {
  return gulp.src(path.test)
    .pipe(concat(path.testFile))
    .pipe(babel({
        presets: ['es2015']
    }))
    .pipe(gulp.dest(path.dist));
});

gulp.task('clean', function(){
  return del([path.dist]);
});

gulp.task('run-tests', () => {
    return gulp.src(path.dist + '/' + path.testFile, {read: false})
        .pipe(mocha({reporter: 'spec'}));
});