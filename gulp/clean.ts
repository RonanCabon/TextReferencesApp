'use strict';

var gulp = require('gulp');
var del = require('del');

//clean: supprime le répertoire dist et cache
gulp.task('clean', function () {
    return del(['.tmp', 'dist']);
});
