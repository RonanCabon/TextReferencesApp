'use strict';

var gulp = require('gulp');

/**
* Copy all resources that are not TypeScript files into build (/dist) directory.
*/
gulp.task('resources', function() {
	return gulp.src(['src/**/**', '!**/*.ts']).pipe(gulp.dest('dist'));
});
