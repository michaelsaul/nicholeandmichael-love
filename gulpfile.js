var gulp = require('gulp'),
    sourcemaps = require('gulp-sourcemaps'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    notify = require('gulp-notify'),
    bower = require('gulp-bower'),
    merge = require('merge-stream');

var config = {
    sassPath:   './assets/sass',
    sassFile:   '/style-02.scss',
    jsPath:     './assets/js',
    jsFile:     '/style-02.js',
    cssOutPath:    './public/css',
    jsOutPath:  './public/js',
    bowerDir:   './bower_components',
    jsPluginsDir:   './public/js/plugins'
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

gulp.task('plugins',function () {
    var bootstrap = gulp.src(config.bowerDir + '/bootstrap-sass/assets/javascripts/bootstrap.min.js')
    .pipe(gulp.dest(config.jsPluginsDir));

    var jquery = gulp.src(config.bowerDir + '/jquery/dist/jquery.min.js')
    .pipe(gulp.dest(config.jsPluginsDir));

    var flexslider = gulp.src(config.bowerDir + '/flexslider/jquery.flexslider-min.js')
    .pipe(gulp.dest(config.jsPluginsDir));

    var scrollreveal = gulp.src(config.bowerDir + '/scrollreveal/dist/scrollreveal.min.js')
    .pipe(gulp.dest(config.jsPluginsDir));

    return merge(bootstrap, jquery, flexslider, scrollreveal);
});

gulp.task('default', ['bower', 'icons', 'css','js', 'plugins'], function() {
    gulp.watch(config.sassPath + '/*.scss', ['css']);
    gulp.watch(config.jsPath + '/*.js', ['js']);
});