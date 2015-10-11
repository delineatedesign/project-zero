var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    cache = require('gulp-cached'),
    concat = require('gulp-concat'),
    cssmin = require('gulp-minify-css'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    prefix = require('gulp-autoprefixer'),
    jshint = require('gulp-jshint'),
    minifyHTML = require('gulp-minify-html'),
    notify = require('gulp-notify'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    scsslint = require('gulp-scss-lint'),
    size = require('gulp-size'),
    uglify = require('gulp-uglify');


    gulp.task('scss', function() {
        var onError = function(err) {
            notify.onError({
                title:    "Gulp SCSS",
                subtitle: "Uh oh! Something's not right",
                message:  "Error: <%= error.message %>",
                sound:    "Beep"
            })(err);
            this.emit('end');
        };
        
        return gulp.src('css/main.scss')
        .pipe(plumber({errorHandler: onError}))
        .pipe(sass())
        .pipe(size({ gzip: true, showFiles: true }))
        .pipe(prefix('last 2 versions'))
        .pipe(rename('main.css'))
        .pipe(gulp.dest('dist/css'))
        .pipe(reload({stream:true}))
        .pipe(cssmin())
        .pipe(size({ gzip: true, showFiles: true }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('dist/css'))
    });
    
    gulp.task('scss-lint', function() {
        gulp.src('css/**/*.scss')
        .pipe(cache('scsslint'))
        .pipe(scsslint());
    });

    gulp.task('minify-html', function() {
        var opts = {
            comments:true,
            spare:true
        };
        
        gulp.src('./*.html')
        //.pipe(minifyHTML(opts))
        .pipe(gulp.dest('dist/'))
        .pipe(reload({stream:true}));
    
    });
    
    gulp.task('js', function() {
        gulp.src('js/**/*.js')
        //.pipe(uglify())
        .pipe(size({ gzip: true, showFiles: true }))
        //.pipe(concat('custom.js'))
        .pipe(gulp.dest('dist/js'))
        .pipe(reload({stream:true}));
    });
    
    gulp.task('jshint', function() {
        gulp.src('dist/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
    });
    
    gulp.task('imagemin', function () {
        return gulp.src('img/*')
            .pipe(imagemin({
                progressive: true,
                svgoPlugins: [{removeViewBox: false}],
                use: [pngquant()]
            }))
            .pipe(gulp.dest('dist/img'));
    });
    
    gulp.task('browser-sync', function() {
        browserSync({
            server: {
                baseDir: "dist/"
            }
        });
    });
    
    gulp.task('watch', function() {
        gulp.watch('css/**/*.scss', ['scss']);
        gulp.watch('js/*.js', ['js']);
        gulp.watch('./*.html', ['minify-html']);
        gulp.watch('img/*', ['imagemin']);
    });


    gulp.task('default', ['browser-sync', 'scss', 'js', 'imagemin', 'minify-html', 'watch']);