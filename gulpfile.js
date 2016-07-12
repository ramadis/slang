var gulp = require('gulp');
var runSequence = require('run-sequence');
var babel = require('gulp-babel');
var del = require('del');
var mocha = require('gulp-mocha');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

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

function distribute (orPath, dest) {
  return gulp.src(orPath)
    .pipe(concat(dest))
    .pipe(babel({
        presets: ['es2015']
    }))
    .pipe(uglify())
    .pipe(gulp.dest(path.dist));
}

gulp.task('source', function () {
  return distribute(path.src, path.srcFile);
});

gulp.task('test', function () {
  return distribute(path.test, path.testFile);
});

gulp.task('clean', function(){
  return del([path.dist]);
});

gulp.task('run-tests', () => {
  return gulp.src(path.dist + '/' + path.testFile, {read: false})
        .pipe(mocha({reporter: 'spec'}));
});