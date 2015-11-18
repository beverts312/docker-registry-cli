/// <reference path="typings/tsd.d.ts" />
'use strict';

var gulp = require('gulp');
var tsc = require('gulp-typescript');
var sourceMaps = require('gulp-sourcemaps');
var tsd = require('gulp-tsd');
var tslint = require('gulp-tslint');
var del = require('del');

var gulpConfig = require('./gulp-config.json');

gulp.task('install-typings', function (cb) {
    tsd({
        command: 'reinstall',
        config: './tsd.json'
    }, cb)
});

gulp.task('clean', function (cb) {
    del(gulpConfig.allTranspiledJavaScript, cb);
});
gulp.task('tslint', function () {
    return gulp.src(gulpConfig.typeScriptSourceAndTests)
        .pipe(tslint())
        .pipe(tslint.report('verbose'));
});
gulp.task('transpile', ['clean'], function () {
    var tsResult = gulp.src(gulpConfig.allTypeScript, { base: '.' })
    .pipe(sourceMaps.init())
    .pipe(tsc({
        target: 'ES5',
        declarationFiles: false,
        noExternalResolve: true,
        module: 'CommonJS'
    }));
        //.on('error', function () { throw new Error('TypeScript transpilation error.')});
    return tsResult.js
        .pipe(sourceMaps.write(''))
        .pipe(gulp.dest(''));
});