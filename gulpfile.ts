/**
 * Fichier de configuration de gulp
 * Gulp est utilisé pour automatiser les tâches de déploiement, tests unitaires et intégrations.
 */

'use strict';

// var require;

var gulp = require('gulp');
var wrench = require('wrench');
var runSequence = require('run-sequence');

//polyfill node <v4.x (integ)
require('es6-promise').polyfill();

//Charge les fichiers de configuration Gulp
wrench.readdirSyncRecursive('./gulp').filter(function (file) {
    return (/\.(ts|coffee)$/i).test(file);
}).map(function (file) {
    require('./gulp/' + file);
});

//par défaut on lance la tâche build
gulp.task('default', ['build']);
