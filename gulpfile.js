var gulp = require('gulp');
var babel = require('gulp-babel');
var intercept = require('gulp-intercept');
var branchTranspiler = require('branch-transpiler');

gulp.task('build', function () {
  return gulp.src([
    'src/**/*.*'
  ])
  .pipe(intercept(branchTranspiler))
  .pipe(babel())
  .pipe(gulp.dest('build'));
});