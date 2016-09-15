var gulp = require('gulp');
var sass = require('gulp-sass');
var ts   = require('gulp-typescript');
var browserSync = require('browser-sync').create();

var input = './src/';
var output = './wwwroot/';

gulp.task('ts', function () {
    return gulp.src(input + '**/*.ts')
        .pipe(ts({
            noImplicitAny: true
        }))
        .pipe(gulp.dest(output));

});
gulp.task('ts-watch', ['ts'], function (done) {
    browserSync.reload();
    done();
});


gulp.task('html', function () {
    return gulp.src(input + '**/*.html')
        .pipe(gulp.dest(output));
});
gulp.task('html-watch', ['html'], function (done) {
    browserSync.reload();
    done();
});


gulp.task('sass', function () {
    return gulp.src(input + '**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest(output));
});
gulp.task('sass-watch', ['sass'], function (done) {
    browserSync.reload();
    done();
});

gulp.task('serve', ['ts', 'html', 'sass'], function () {

    browserSync.init({
        server: {
            baseDir: output
        }
    });

    gulp.watch(input + "**/*.ts", ['ts-watch']);
    gulp.watch(input + "**/*.html", ['html-watch']);
    gulp.watch(input + "**/*.scss", ['sass-watch']);
});


gulp.task('build', ['ts', 'html', 'sass'], function () {
    browserSync.reload();
});
gulp.task('build-prod', function () {
    isProd = true;
    gulp.start('build');
});