var gulp = require('gulp'),
    sass = require('gulp-sass'),
    notify = require("gulp-notify"),
    bower = require('gulp-bower');

var config = {
    sassPath: './assets/sass',
    sassFile: '/style-02.scss',
    bowerDir: './bower_components'
}

gulp.task('bower', function() {
    return bower()
        .pipe(gulp.dest(config.bowerDir))
});

gulp.task('icons', function() {
    return gulp.src(config.bowerDir + '/fontawesome/fonts/**.*')
        .pipe(gulp.dest('./public/fonts'));
});

gulp.task('css', function() {
    return gulp.src(config.sassPath + config.sassFile)
        .pipe(sass({
            outputStyle: 'compressed',
            includePaths: [
                config.sassPath,
                config.bowerDir + '/bootstrap-sass/assets/stylesheets',
                config.bowerDir + '/font-awesome/scss'
            ]})
        .on('error',sass.logError))
        .pipe(gulp.dest('./public/css'));
});

gulp.task('default', ['bower', 'icons', 'css'], function() {
    gulp.watch(config.sassPath + '/*.scss', ['css']);
})