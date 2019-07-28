const gulp = require('gulp');
const ts = require('gulp-typescript');
const tsProject = ts.createProject('tsconfig.json');

exports.default = () => {
  return tsProject.src()
    .pipe(tsProject())
    .js.pipe(gulp.dest('dist'));
}