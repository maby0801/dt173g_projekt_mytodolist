// DT173G Webbutveckling III
// Projektarbete - myTodoList
// Mattias Bygdeson

const gulp = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const uglifycss = require('gulp-uglifycss');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');

// Activate all automation
gulp.task('default', ['transfer_php', 'convert_js', 'convert_css', 'transfer_img', 'transfer_fonts', 'watch'], function(){   
});

// Move all php files to pub
gulp.task('transfer_php', function(){
    return gulp.src('src/*.php')
        .pipe(gulp.dest('pub/'))
});

// Move all jpg and png image files to pub
gulp.task('transfer_img', function(){
    return gulp.src('src/img/*.{jpg,png}')
        .pipe(gulp.dest('pub/img'));
});

// Move all fonts to pub
gulp.task('transfer_fonts', function(){
    return gulp.src('src/fonts/*.{ttf,otf}')
        .pipe(gulp.dest('pub/fonts/'));
});

// Concatenate and compress all javascript files and move to pub
gulp.task('convert_js', function(){
    return gulp.src('src/js/*.js')
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('pub/js'))
});

// Convert all sass files to css. Concatenate and compress all css files and move to pub
gulp.task('convert_css', function(){
    return gulp.src('src/scss/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(concat('style.min.css'))
        .pipe(uglifycss())
        .pipe(gulp.dest('pub/css'))
});

// Look for changes in the file system
gulp.task('watch', function(){
    gulp.watch('src/js/*.js', ['convert_js']);
    gulp.watch('src/scss/*.scss', ['convert_css']);
    gulp.watch('src/*.php', ['transfer_php']);
    gulp.watch('src/img/*.{jpg,png}', ['transfer_img']);
    gulp.watch('src/fonts/*.{ttf,otf}', ['transfer_fonts']);
})