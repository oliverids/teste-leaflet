const gulp = require('gulp'),
    concat = require('gulp-concat');

function jsTask() {
    return gulp.src(['public/js/_functions.js', 'public/js/main.js'])
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest('public/js'))
}

exports.default = jsTask