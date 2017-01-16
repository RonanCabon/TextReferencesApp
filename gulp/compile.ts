'use strict';

var gulp = require('gulp');
var tsc = require('gulp-typescript');
var sourcemaps  = require('gulp-sourcemaps');
var tsProject = tsc.createProject('tsconfig.json');

/**
* Compile TypeScript sources and create sourcemaps in build directory.
*/
gulp.task('compile', function() {
let tsResult = gulp.src('src/**/*.ts').pipe(sourcemaps.init()).pipe(tsc(tsProject));
	return tsResult.js.pipe(sourcemaps.write('.', {sourceRoot: '/src'})).pipe(gulp.dest('dist'));
});