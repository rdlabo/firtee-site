const gulp = require('gulp');
const $    = require('gulp-load-plugins')();
const browserSync = require("browser-sync");
const minifycss = require('gulp-minify-css');
const reload  = browserSync.reload;
const sassPaths = [
    'node_modules/foundation-sites/scss',
    'node_modules/motion-ui/src'
];

gulp.task('sass', function() {
    return gulp.src('scss/app.scss')
        .pipe($.sass({
            includePaths: sassPaths
        })
            .on('error', $.sass.logError))
        .pipe($.autoprefixer({
            browsers: ['last 2 versions', 'ie >= 9']
        }))
        .pipe(minifycss())
        .pipe(gulp.dest('./www'));
});

// browserSync ルートはdest
gulp.task("browserSync", function () {
   browserSync.init({
       server: {
           baseDir: "./www" // ルートとなるディレクトリを指定
       }
   });
});

gulp.task("watch",function(){
   gulp.watch('scss/**/*.scss', ['sass']),
   gulp.watch(['www/**/*.html',　'www/**/*.css'], reload);
});

gulp.task("default",["watch", "browserSync"]);