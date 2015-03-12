/* jshint node: true */
'use strict';

var gulp = require('gulp'),
    maven = require('gulp-maven-deploy');

/**
 * Deployment
 * Options: https://github.com/finn-no/maven-deploy
 */
 var filesToMove = [
         './*',
         './*/*',
         './*/*/*',
         '.*'
     ];

 gulp.task('move', function(){
   // the base option sets the relative root for the set of files,
   // preserving the folder structure
   gulp.src(filesToMove, { base: './' })
   .pipe(gulp.dest('dist'));
 });

gulp.task('mvn-install', ['move'], function(){
  return gulp.src('.')
    .pipe(maven.install({
        'config': {
            'groupId': 'no.storebrand.js',
            'type': 'war'
        }
    }));
});

gulp.task('mvn-deploy',['move'], function(){
    return gulp.src('.')
    .pipe(maven.deploy({
        'config': {
            'groupId': 'no.storebrand.js',
            'type': 'war',
            'repositories': [
                {
                    'id': 'snapshots',
                    'url': 'http://maven.storebrand.no/nexus/content/repositories/snapshots'
                }
            ],
            'snapshot': true
        }
    }));
});

gulp.task('mvn-deploy-release', ['move'], function(){
  return gulp.src('.')
    .pipe(maven.deploy({
        'config': {
            'groupId': 'no.storebrand.js',
            'type': 'war',
            'repositories': [
                {
                    'id': 'releases',
                    'url': 'http://maven.storebrand.no/nexus/content/repositories/releases'
                }
            ]
        }
    }));
});
