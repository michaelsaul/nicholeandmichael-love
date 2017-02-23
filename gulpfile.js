var gulp = require('gulp'),
    sourcemaps = require('gulp-sourcemaps'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    notify = require('gulp-notify'),
    bower = require('gulp-bower');

var config = {
    sassPath:   './assets/sass',
    sassFile:   '/style-02.scss',
    jsPath:     './assets/js',
    jsFile:     '/style-02.js',
    cssOutPath:    './public/css',
    jsOutPath:  './public/js',
    bowerDir:   './bower_components'
}

gulp.task('bower', function() {
    return bower()
        .pipe(gulp.dest(config.bowerDir))
});

gulp.task('icons', function() {
    return gulp.src(config.bowerDir + '/font-awesome/fonts/**.*')
        .pipe(gulp.dest('./public/fonts'));
});

gulp.task('css', function() {
    return gulp.src(config.sassPath + config.sassFile)
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed',
            includePaths: [
                config.sassPath,
                config.bowerDir + '/bootstrap-sass/assets/stylesheets',
                config.bowerDir + '/font-awesome/scss'
            ]})
        .on('error',sass.logError))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest(config.cssOutPath));
});

gulp.task('js', function () {
    return gulp.src(config.jsPath + config.jsFile)
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(config.jsOutPath))
});

gulp.task('jquery', function () {
    return gulp.src(config.bowerDir + '/jquery/dist/jquery.min.js')
    .pipe(gulp.dest('./public/js/plugins'));
})

gulp.task('default', ['bower', 'icons', 'css','js', 'jquery'], function() {
    gulp.watch(config.sassPath + '/*.scss', ['css']);
    gulp.watch(config.jsPath + '/*.js', ['js']);
});