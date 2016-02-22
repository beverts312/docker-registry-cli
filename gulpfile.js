/// <reference path="typings/tsd.d.ts" />
'use strict';

var gulp = require('gulp');
var tsc = require('gulp-typescript');
var sourceMaps = require('gulp-sourcemaps');
var tsd = require('gulp-tsd');
var tslint = require('gulp-tslint');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var mocha = require('gulp-mocha');
var istanbul = require('gulp-istanbul');
var coverageEnforcer = require('gulp-istanbul-enforcer');
var browserOpen = require('gulp-open');
var del = require('del');
var Chai = require('chai');
var header = require('gulp-header');

var gulpConfig = require('./config/gulp-config.json');

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
gulp.task('add-shebangs', ['transpile'], function (){
    return gulp.src(gulpConfig.executables)
        .pipe(header('#!/usr/bin/env node\n'))
        .pipe(gulp.dest('bin/'))
});
gulp.task('run-unit-tests', ['transpile', 'add-shebangs'], function (cb) {
    gulp.src(gulpConfig.javaScriptSource)
    .pipe(istanbul({
        "includeUntested": ["true"]
    }))
    .pipe(istanbul.hookRequire())
    .on('finish', function () {
        gulp.src(gulpConfig.javaScriptUnitTests)
        .pipe(mocha({
                timeout: 3000,
				reporter: "mocha-multi", 
				reporterOptions: gulpConfig.multiMochaReporterOptions
            }))
        .pipe(istanbul.writeReports({
            "reporters": gulpConfig.istanbulReporters,
             "dir": gulpConfig.istanbulUnitTestsCoverageFolder
        }))
        .on('end', cb);
    });
});
