/**
 * Created by whisp_000 on 2016/5/30.
 */
const gulp = require('gulp');
// const gutil = require('gulp-util');
// const concat = require('gulp-concat');
// const rename = require('gulp-rename');
// const sh = require('shelljs');
const babel = require('gulp-babel');
const glob=require('glob');
var helper =require('./config/gulp-helper');

gulp.task('default', ['es6'],function() {
    "use strict";
    glob("src/**/*.js", {}, function (er, files) {
        files.map((item) => {
            var result = helper.filepath(item);
            console.log(result.folder);
            return gulp.src(item.toString())
                .pipe(babel()).pipe(gulp.dest('./build/' + result.folder));
        })
    });
});
gulp.task('es6',[],function()
{
    glob("src/**/*.js", {}, function (er, files) {
        // files is an array of filenames.
        // If the `nonull` option is set, and nothing
        // was found, then files is ["**/*.js"]
        // er is an error object or null.
        files.map((item) => {
            var watcher = gulp.watch(item.toString(),
                function(event) {
                var result=helper.filepath(item);
                console.log(result.folder);
                return gulp.src(item.toString())
                    .pipe(babel({
                        presets: ['es2016', 'stage-3']
                    })).pipe(gulp.dest('./build/'+result.folder));
            });

        });

    });
});




gulp.task('install', ['git-check'], function() {
    return bower.commands.install()
        .on('log', function(data) {
            gutil.log('bower', gutil.colors.cyan(data.id), data.message);
        });
});

gulp.task('git-check', function(done) {
    if (!sh.which('git')) {
        console.log(
            '  ' + gutil.colors.red('Git is not installed.'),
            '\n  Git, the version control system, is required to download Ionic.',
            '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
            '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
        );
        process.exit(1);
    }
    done();
});
