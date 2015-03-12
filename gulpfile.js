/* jshint node: true */
'use strict';

var gulp = require('gulp'),
    maven = require('gulp-maven-deploy');

/**
 * Deployment
 * Options: https://github.com/finn-no/maven-deploy
 */
gulp.task('mvn-install', function(){
  return gulp.src('.')
    .pipe(maven.install({
        'config': {
            'groupId': 'no.storebrand.js',
            'type': 'war'
        }
    }));
});

gulp.task('mvn-deploy',  function(){
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

gulp.task('mvn-deploy-release',  function(){
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
