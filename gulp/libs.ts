'use strict';

var gulp = require('gulp');

/**
* Copy all resources that are not TypeScript files into build directory.
*/
gulp.task('libs', function() {
return gulp.src([
            'core-js/client/shim.min.js',
            'systemjs/dist/system-polyfills.js',
            'systemjs/dist/system.src.js',
            'reflect-metadata/Reflect.js',
            'rxjs/**',
            'zone.js/dist/**',
            '@angular/**',
            'bootstrap/dist/**'
        ], {cwd: "node_modules/**"}) /* Glob required here. */
        .pipe(gulp.dest("dist/lib"));		
});
