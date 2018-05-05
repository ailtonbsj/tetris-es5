var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var browserify  = require('browserify');
var source      = require('vinyl-source-stream');

gulp.task('browserify', function() {
    return browserify('index.js')
        .bundle()
        //Pass desired output filename to vinyl-source-stream
        .pipe(source('bundle.js'))
        // Start piping stream to tasks!
        .pipe(gulp.dest('.'));
});


gulp.task('browsersync-reload', ['browserify'], function (done) {
    browserSync.reload();
    done();
});


gulp.task('default', ['browserify'], function () {

    browserSync.init({
        server: {
            baseDir: "."
        }
    });

    gulp.watch("*.js", ['browsersync-reload']);
});