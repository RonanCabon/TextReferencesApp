'use strict';

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var runSequence = require('run-sequence');
var tslint = require('gulp-tslint');

var jshintFiles = ['src/app/**/*.js'];
var tslintFiles = ['gulpfile.js','src/app/**/*.ts','!src/systemjs.config.js','!node_modules/**/*'];

var testFiles = ['test/**/*.spec.js'];

//jshint: vérifie la syntaxe javascript
gulp.task('jshint', function () {
    return gulp.src(jshintFiles)
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('default'));
});

gulp.task('jshint-test', function () {
    return gulp.src(testFiles)
        .pipe(jshint('test/.jshintrc'))
        .pipe(jshint.reporter('default'));
});

//jscs: vérifie la syntaxe javascript
gulp.task('jscs', function () {
    return gulp.src(jshintFiles)
        .pipe(jscs({configPath: '.jscsrc'}))
        .pipe(jscs.reporter());
});

gulp.task('jscs-test', function () {
    return gulp.src(testFiles)
        .pipe(jscs({configPath: '.jscsrc'}))
        .pipe(jscs.reporter());
});

gulp.task('tslint', function() {
	return gulp.src(tslintFiles)
		.pipe(tslint({formatter:'prose', configPath: 'tslint.json'}))
		.pipe(tslint.report('verbose'));
});

//gulp.task('tslint', function (callback) {
//    runSequence(['jshint', 'jshint-test'], ['jscs', 'jscs-test'], ['tslint'], callback);
//});
